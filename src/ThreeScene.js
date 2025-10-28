// ==========================
// Section 1: Imports
// ==========================
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { createMenuLabels } from './MenuOptions';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// ==========================
// Section 2: Component State & References
// ==========================
const ThreeScene = ({ onActiveLabelChange }) => {
  const mountRef = useRef(null);
  const headRef = useRef(null);
  const haloRef = useRef(null);
  const [fallingChars, setFallingChars] = useState([]);
  const targetHaloRotation = useRef(0);
  const [currentSection, setCurrentSection] = useState('Welcome');
  const [currentDesc, setCurrentDesc] = useState('Home Home Home Home');
  let labelGroup = null;
  let activeLabel = null;
  let squareLabel = null;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const sections = [
    'Welcome',
    'OPEN',
    'OPEN',
    'OPEN',
    'OPEN',
    'OPEN',
  ];
  const desc = [
    'Home Home Home Home',
    'Education/Experience Education/Experience',
    'CyberSecurity CyberSecurity',
    'Games Games Games',
    'Art/Creativity Art/Creativity Art/Creativity',
    'Data Structures Data Structures',
  ];

  // ==========================
  // Section 3: Section & Label Updates
  // ==========================
  useEffect(() => {
    squareLabel = document.querySelector('.open-btn');
    if (squareLabel) squareLabel.textContent = currentSection;
  }, [currentSection]);

  const updateSectionFromRotation = () => {
    let normalized =
      (targetHaloRotation.current % (2 * Math.PI) + 2 * Math.PI) %
      (2 * Math.PI);
    const index = Math.round(normalized / (Math.PI / 3)) % 6;
    setCurrentSection(sections[index]);
    setCurrentDesc(desc[index]);
  };

  // ==========================
  // Section 4: Click Handler (Arrows)
  // ==========================
  const handleClick = (event, leftArrow, rightArrow, raycaster, camera) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([leftArrow, rightArrow]);

    if (intersects.length > 0) {
      const angleIncrement = THREE.MathUtils.degToRad(60);
      if (intersects[0].object.name === 'leftArrow') {
        targetHaloRotation.current -= angleIncrement;
      } else if (intersects[0].object.name === 'rightArrow') {
        targetHaloRotation.current += angleIncrement;
      }
      updateSectionFromRotation();
    }
  };

  // ==========================
  // Section 5: Scene Initialization
  // ==========================
  useEffect(() => {
    const scene = new THREE.Scene();

    // ✅ Gradient Background using a fullscreen plane
    const gradientGeo = new THREE.PlaneGeometry(2, 2);
    const gradientMat = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color('#5433ff') },
        color2: { value: new THREE.Color('#a5fecb') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 color1;
        uniform vec3 color2;
        void main() {
          gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    });
    const gradientMesh = new THREE.Mesh(gradientGeo, gradientMat);
    gradientMesh.renderOrder = -1;
    scene.add(gradientMesh);

    // ==========================
    // Section 6: Camera & Renderer Setup
    // ==========================
    window.addEventListener('click', onClick, false);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 200;

    const targetAmbientColor = new THREE.Color('#5433ff');

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current && mountRef.current.children.length === 0) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update camera aspect ratio and projection
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(width, height);

    // Optional: if you use pixel ratio
    renderer.setPixelRatio(window.devicePixelRatio);
    });



    // ==========================
    // Section 7: Post-Processing Effects (Bloom)
    // ==========================
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.6,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    // ==========================
    // Section 8: Label Click Handling
    // ==========================
    function onClick(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(labelGroup.children, true);

      if (intersects.length > 0) {
        const clickedLabel = intersects[0].object;
        activeLabel = clickedLabel.name;

        const clickedIndex = clickedLabel.userData.index;
        const currentRotation =
          (targetHaloRotation.current % (2 * Math.PI) + 2 * Math.PI) % 
          (2 * Math.PI);
        const currentIndex =
          Math.round(currentRotation / (Math.PI / 3)) % sections.length;

        const angleDiff =
          ((clickedIndex - currentIndex + sections.length) % sections.length) *
          (Math.PI / 3);
        targetHaloRotation.current += angleDiff;

        squareLabel.innerText = clickedLabel.name;
      }
    }

    // ==========================
    // Section 9: 3D Model & Halo Setup
    // ==========================
    const loader = new GLTFLoader();
    loader.load(
      process.env.PUBLIC_URL + '/head_study.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(200, 200, 200);
        scene.add(model);
        headRef.current = model;

        // Head material setup
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              color: '#e3ddffff',
              emissive: '#a5fecb',
              emissiveIntensity: 1.027,
              metalness: 0.7,
              roughness: 0.3,
            });
          }
        });

        // HALO setup
        const haloGeometry = new THREE.TorusGeometry(60, 5, 3, 6);
        const haloMaterial = new THREE.MeshStandardMaterial({
          color: '#a5fecb',
          emissive: '#5433ff',
          emissiveIntensity: 1,
          roughness: 0.2,
          metalness: 0.5,
        });
        const halo = new THREE.Mesh(haloGeometry, haloMaterial);
        halo.rotation.x = Math.PI / 2;
        halo.position.set(0, 70, 0);

        // Menu labels on halo
        labelGroup = createMenuLabels();
        labelGroup.rotation.x = -Math.PI / 2;
        labelGroup.position.z = 80;
        halo.add(labelGroup);
        scene.add(halo);
        haloRef.current = halo;
        updateSectionFromRotation();

        // ==========================
        // Section 10: Navigation Arrows
        // ==========================
        const arrowMat = new THREE.MeshBasicMaterial({ color: '#a5fecb' });

        // Left arrow
        const leftShape = new THREE.Shape();
        leftShape.moveTo(0, 0);
        leftShape.lineTo(-20, 10);
        leftShape.lineTo(-20, -10);
        leftShape.lineTo(0, 0);
        const leftGeom = new THREE.ShapeGeometry(leftShape);
        const leftArrow = new THREE.Mesh(leftGeom, arrowMat);
        leftArrow.position.set(100, 80, 0);
        leftArrow.name = 'leftArrow';
        scene.add(leftArrow);

        // Right arrow
        const rightShape = new THREE.Shape();
        rightShape.moveTo(0, 0);
        rightShape.lineTo(20, 10);
        rightShape.lineTo(20, -10);
        rightShape.lineTo(0, 0);
        const rightGeom = new THREE.ShapeGeometry(rightShape);
        const rightArrow = new THREE.Mesh(rightGeom, arrowMat);
        rightArrow.position.set(-100, 80, 0);
        rightArrow.name = 'rightArrow';
        scene.add(rightArrow);

        // ==========================
        // Section 11: Mouse Movement & Interaction
        // ==========================
        const handleMouseMove = (event) => {
          if (!headRef.current) return;
          const x = (event.clientX / window.innerWidth) * 2 - 1;
          const y = -(event.clientY / window.innerHeight) * 2 + 1;

          const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
          const maxRotation = Math.PI / 4;

          headRef.current.rotation.y = clamp(x * maxRotation, -maxRotation, maxRotation);
          headRef.current.rotation.x = -clamp(y * maxRotation, -maxRotation, maxRotation);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', (event) =>
          handleClick(event, leftArrow, rightArrow, raycaster, camera)
        );

        // ==========================
        // Section 12: Matrix Falling Characters
        // ==========================
        // const generateFallingChars = () => {
        //   const newChars = [];
        //   for (let i = 0; i < 100; i++) {
        //     newChars.push({
        //       x: Math.random() * window.innerWidth,
        //       y: Math.random() * window.innerHeight,
        //       char: String.fromCharCode(33 + Math.random() * 94),
        //       speed: Math.random() * 1 + 0.5,
        //     });
        //   }
        //   setFallingChars(newChars);
        // };
        // generateFallingChars();

        // ==========================
        // Section 13: Label Highlighting
        // ==========================
        const updateLabelOpacities = () => {
          if (!labelGroup) return;
          const normalized =
            (targetHaloRotation.current % (2 * Math.PI) + 2 * Math.PI) % 
            (2 * Math.PI);
          const activeIndex =
            Math.round(normalized / (Math.PI / 3)) % sections.length;

          labelGroup.children.forEach((label, index) => {
            label.material.opacity = index === activeIndex ? 1 : 0.2;
            label.material.transparent = true;
            label.material.color.set(
              index === activeIndex ? '#5433ff' : '#a5fecb'
            );
          });
          activeLabel = labelGroup.children[activeIndex];
          if (onActiveLabelChange && activeLabel?.name) {
            onActiveLabelChange(activeLabel.name);
          }
          if (activeLabel?.material?.color) {
            targetAmbientColor.copy(activeLabel.material.color);
          }
        };
        
        

        // ==========================
        // Section 14: Animation Loop
        // ==========================
        const animate = () => {
          requestAnimationFrame(animate);
          if (haloRef.current) {
            const delta = targetHaloRotation.current - haloRef.current.rotation.z;
            haloRef.current.rotation.z += delta * 0.1;
            updateLabelOpacities();
          }
          setFallingChars((prevChars) =>
            prevChars.map((char) => {
              const newY = char.y + char.speed;
              return { ...char, y: newY > window.innerHeight ? -10 : newY };
            })
          );
          composer.render();
        };
        animate();
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );
  }, []);

  // ==========================
  // Section 15: React JSX Return
  // ==========================
  return (
    <>
      <div ref={mountRef} />
      <div className="falling-chars">
        {fallingChars.map((char, index) => (
          <span
            key={index}
            style={{
              position: 'absolute',
              left: char.x,
              top: char.y,
              color: index % 2 === 0 ? '#5433ff' : '#a5fecb',
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '18px',
              zIndex: 1,
            }}
          >
            {char.char}
          </span>
        ))}
      </div>
    </>
  );
};

export default ThreeScene;
