// src/MenuOptions.js
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import optimer from 'three/examples/fonts/optimer_regular.typeface.json'; // cleaner font
import { depth, positionGeometry } from 'three/src/nodes/TSL.js';

export function createMenuLabels() {
  const fontLoader = new FontLoader();
  const font = fontLoader.parse(optimer);

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // white
  const group = new THREE.Group();

const labelConfigs = [
  {
    text: 'Home',
    radius: 60,
    angleOffset: 0,
    y: 40,
    rotation: { x: 0, y: 0, z: 0 },
    lookAtCenter: false,
    color: 0xff0000, // 🔴 Red
  },
  {
    text: 'Education',
    radius: 80,
    angleOffset: Math.PI / 3 - 0.15,
    y: 40,
    rotation: { x: 0, y: 60, z: 0 },
    lookAtCenter: false,
    color: 0x00ff00, // 🟢 Green
  },
  {
    text: 'CyberSecurity',
    radius: 100,
    angleOffset: 2 * Math.PI / 3 - 0.5,
    y: 40,
    rotation: { x: 0, y: 120, z: 0 },
    lookAtCenter: false,
    color: 0x0000ff, // 🔵 Blue
  },
  {
    text: 'Games',
    radius: 70,
    angleOffset: Math.PI - 0.5,
    y: 40,
    rotation: { x: 0, y: 180, z: 0 },
    lookAtCenter: false,
    color: 0xffff00, // 🟡 Yellow
  },
  {
    text: 'Designs',
    radius: 55,
    angleOffset: 4 * Math.PI / 3 - 0.5,
    y: 40,
    rotation: { x: 0, y: 240, z: 0 },
    lookAtCenter: false,
    color: 0xff00ff, // 🟣 Magenta
  },
  {
    text: 'Data Handling',
    radius: 35,
    angleOffset: 5 * Math.PI / 3 - 0.55,
    y: 40,
    rotation: { x: 0, y: 300, z: 0 },
    lookAtCenter: false,
    color: 0x00ffff, // 🔵 Cyan
  },
];

labelConfigs.forEach((label) => {
  const geometry = new TextGeometry(label.text, {
    font: font,
    size: 8,
    depth: 2,
    curveSegments: 6,
    bevelEnabled: false,
  });

  geometry.computeBoundingBox();
  const centerOffset =
    (geometry.boundingBox.max.x - geometry.boundingBox.min.x) / 2;

  const material = new THREE.MeshBasicMaterial({ color: label.color || 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = label.text;

  // ✅ Add index for interaction logic
  mesh.userData = {
    color: label.color,
    index: labelConfigs.indexOf(label),
  };

  const x = label.radius * Math.sin(label.angleOffset);
  const z = label.radius * Math.cos(label.angleOffset);
  mesh.position.set(x - centerOffset, label.y, z);

  if (label.rotation) {
    mesh.rotation.set(
      THREE.MathUtils.degToRad(label.rotation.x || 0),
      THREE.MathUtils.degToRad(label.rotation.y || 0),
      THREE.MathUtils.degToRad(label.rotation.z || 0)
    );
  }

  if (label.lookAtCenter) {
    mesh.lookAt(new THREE.Vector3(0, label.y, 0));
  }

  group.add(mesh);
});


  return group;
}
