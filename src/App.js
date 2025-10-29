// ==========================
// Section 1: Imports
// ==========================
import React, { useState } from 'react';
import './App.css';
import ThreeScene from './ThreeScene';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

// ==========================
// Section 2: Component State & Handlers
// ==========================
function App() {
  const [expanded, setExpanded] = useState(false);
  const [activeCircle, setActiveCircle] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState('Home');

  const handleOpenClick = () => setExpanded(true);

  const handleRightClick = () => {
    setActiveCircle((prev) => {
      const pages = getPagesForLabel(activeLabel);
      return (prev + 1) % pages;
    });
  };

  const handleLeftClick = () => {
    setActiveCircle((prev) => {
      const pages = getPagesForLabel(activeLabel);
      return (prev - 1 + pages) % pages;
    });
  };

  // ==========================
  // Section 3: Content Map (added titles)
  // ==========================
  const contentMap = {
    Home: {
      0: {
        title: 'About: Brandon Gonzalez',
        image: '/Projects/me.jpg',
        description:
          <p>

My journey in technology began in middle school, and coding quickly became my favorite way to build and solve problems. I enjoy projects that blend technical skill with my artistic side—art is my creative outlet, enhancing my software development work. I love collaborating with other programmers and the rush of fixing a stubborn bug.

I am deeply fascinated by cybersecurity, driven by the idea that system vulnerabilities can be exploited. This curiosity fuels my commitment to deeply understanding how computers operate and how to protect them.

Committed to continuous learning and staying ahead of rapid technological change, I aim to use computers to impact others’ lives, one line of code at a time.<br/><br/><br/></p>,
      },
    },
    Education: {
      0: {
        title: 'My Education',
        image: '/Projects/mySchool.png',
        description:
          <p><h3>University of Illinois at Chicago.</h3>Bachelor of Science in Computer Science GPA: 3.28, Dean’s List, Fall 2020<br/><br/><h3>College of DuPage.</h3>Associates in Arts GPS: 3.20, Honors Standing Graduate<br/><br/><br/><br/><br/></p>
      },
    },
    CyberSecurity: {
      0: { title: 'Project: BotNetGG', image: '/Projects/cyber/cyber1.png', description: <p>BotNet GoodGamesss lives up to its name: once a computer is infected, it's 'game over' for the victim, as I gain full control. This includes the ability to shut down the computer, simulate any key press (including typing), execute programs, place files in the startup menu, and create/run batch files. Multiple infected computers can be controlled simultaneously, executing the same command at a specified time, with a list presented for the attacker to choose from. What makes this impressive is the ability to send commands from anywhere in the world, transcending local network limitations. While typical computer control requires a local connection, this botnet allows full remote access as long as both computers are internet-connected.<br/><br/><br/></p> },
      1: { title: 'Project: IamPopular.py', image: '/Projects/cyber/cyber2.png', description: <p>Inspired by Watch Dogs 2, ImPopular.py allows you to send simultaneous text messages to multiple phones in an area with a custom message anonymously. This creates a significant distraction, drawing everyone's attention to their devices and away from their surroundings. Written in Python, ImPopular uses datetime for timed attacks, selenium to identify phone carriers and linked email addresses, and the email library to send messages as texts. It takes an array of phone numbers, determines their carriers, and identifies associated emails. An SSH server on a Raspberry Pi awaits a signal from my iPhone to start an attack. Via iPhone app shortcuts, I can select targets, compose messages, and schedule the attack time.<br/><br/><br/></p> },
      2: { title: 'Project: Keylogger Around The World', image: '/Projects/cyber/cyber3.png', description: <p>This keylogger, disguised as a default Windows program and running silently in the background, ensures the user remains completely unaware of its presence. It records every keystroke to an encrypted .txt file, consuming minimal RAM to avoid detection even in a process list. After five Enter presses, the encrypted data is emailed to me for decryption, and the local file is reset. Without the decrypter, any discovered .txt file will be unreadable to the user.<br/><br/><br/></p> },
    },
    Games: {
      0: { title: 'Project: Connect 4', image: '/Projects/game/game1.png', description: <p>This JavaFX-built Connect Four game uses CSS for styling and features an Intro, Main Game, and Winner screen. The simple goal remains: connect four discs of your color. Moves are managed by a Stack, allowing players to undo turns, while a matrix tracks disc placement. It includes three themes and a "start new game" option. The core feature is a comprehensive unit testing algorithm that perfectly verifies all four victory conditions (vertical, horizontal, and both diagonals) across the entire board, saving significant manual testing time.<br/><br/><br/></p>},
      1: { title: 'Project: Baccarat, Server and Client', image: '/Projects/game/game2.png', description: <p>This Baccarat game, developed entirely in Java using JavaFX and CSS, allows users to bet on the Player or the Banker.

The project is built on a client-server architecture. When a user starts a game, the client connects to a server that manages the gameplay and provides real-time monitoring. The server tracks and displays key details for each active game, including the number of connected players, the amount and type of each bet, and the final win/loss results.

When the client places a bet, it transmits the bet type and amount to the server. The server then executes the game of Baccarat using the official rules, determines the outcome, and sends the results back to the client. The server can be easily turned on or off to manage game availability.<br/><br/><br/></p> },
      2: { title: 'Project: 15 puzzle with AI solver', image: '/Projects/game/game3.png', description: <p>This classic 15 Puzzle game is built entirely in Java, utilizing JavaFX for the interface and CSS for its visuals. The goal is to slide the numbered tiles into ascending order, always using the single open space to maneuver pieces.

The application features three scenes: a main play scene, the game itself, and a "play again" screen upon winning. A key feature is the settings menu, which offers two built-in AI puzzle solvers, a new game option, and an exit button. To ensure a challenging and solvable experience, the game includes 10 unique, hard-coded puzzles that guarantee a victory is possible.<br/><br/><br/></p> },
    },
    Designs: {
      0: { title: 'Project: Pair Coding', image: '/Projects/art/art1.png', description: <p>Pair Coding is a collaborative programming platform developed as a group project for my User Interface Design course at UIC. It facilitates live, simultaneous coding sessions for programmers. The platform features secure, password-protected hosting, real-time code viewing, and seamless role swapping (one active editor, others view).<br/><br/>

I was the lead front-end designer, creating a modern, intuitive interface using a futuristic color palette of orange, purple, and cyan. The project was built using React, JavaScript, HTML, and CSS.<br/><br/><br/></p> },
      1: { title: 'Project: Flow.Club', image: '/Projects/art/art2.png', description: <p>Flow.Club is a collaborative platform developed for a User Interface Design course at UIC, specifically engineered to connect and assist engineers in forming project teams.<br/><br/>

The platform allows users to showcase their skills and experience through detailed personal profiles. Key features include the ability to search for ideal collaborators, schedule meetings with integrated video and chat functionality, and for hosts to manage project tasks through a presented task list. My role focused on designing and building the "My Profile" page.<br/><br/><br/></p> },
      2: { title: 'Project: The Scavenger Speedrun App', image: '/Projects/art/art3.png', description: <p>The Scavenger Speedrun Platform is a competitive mobile system designed to transform outdoor exercise into a real-world speedrunning game, utilizing proprietary RFID tags for dynamic course creation. As the Lead Front-End Designer, I was responsible for creating the unified mobile user interface, which manages both route creation (for "Routesetters") and time-trial racing (for "Speedrunners"). <br/><br/>The platform's success is rooted in its dual-user, content-rich model, supported by a dual-database architecture and a plan for FitBit integration to ensure the integrity and verification of all speedrun categories.<br/><br/><br/></p> },
    },
    'Data Handling': {
      0: { title: 'Project: Search Engine', image: '/Projects/data/data1.png', description: <p>This project is a high-speed search engine built entirely in C++ that rapidly processes a separate file containing website links and their content summaries. What makes it powerful is its use of simple command-line syntax for advanced Boolean logic. Users can find pages using OR (words separated by spaces, like "Hello world"), enforce inclusion with AND (prefixing a word with +, like "+Please"), or explicitly remove pages using NOT (prefixing with -, like "-dont"). These operators can be chained into complex queries—such as "Hello world +Please -dont +hire me"—demonstrating a highly efficient and flexible approach to fast text retrieval.<br/><br/><br/></p> },
      1: { title: 'Project: GPS', image: '/Projects/data/data2.png', description: <p>This C++ project acts as a swift map navigation tool utilizing .osm files to process geographical data, specifically focusing on intersections. For demonstration, it leverages UIC campus data, including nodes with coordinates and building names.<br/><br/>

By applying Dijkstra's shortest path algorithm, the system efficiently calculates and displays the shortest route between any two selected campus buildings or intersections. Users simply choose a start and end point, and the algorithm provides a GPS-like path visualization along with the total distance. This versatile solution can be implemented globally, requiring only a compatible .osm file for the desired region.<br/><br/><br/></p> },
      2: { title: 'Project: Backend for Streaming Service', image: '/Projects/data/data3.png', description: <p>This C++ project simulates the robust backend logic of a streaming service akin to Netflix. It operates by processing user rating data and movie/podcast lists from pre-written files, though it's designed to be adaptable with a live server. Users can login to access their profiles, then use the show command to display their full rating history. A key feature is its dual recommendation engine: one method suggests content based on similar users' preferences (collaborative filtering), while the other identifies the top five highest-rated movies or podcasts the user hasn't yet seen, calculated from overall averages. Additional commands facilitate adding new users, submitting ratings, and listing all available content or registered users, demonstrating a comprehensive approach to streaming service management.<br/><br/><br/></p> },
    },
  };

  // Helper to get number of pages
  const getPagesForLabel = (label) => {
    return contentMap[label] ? Object.keys(contentMap[label]).length : 1;
  };

  const showNavigation = getPagesForLabel(activeLabel) > 1;

  // ✅ Get current content safely
  const currentContent = contentMap[activeLabel]?.[activeCircle] || {
    title: 'Time to Explore',
    image: '/Projects/default.png',
    description: 'Default description',
  };

  // ==========================
  // Section 4: JSX Layout
  // ==========================
  return (
    <div className="App">
      {/* Three.js Scene */}
      <ThreeScene
        onActiveLabelChange={(label) => {
          setActiveLabel((prevLabel) => {
            if (prevLabel !== label) {
              setActiveCircle(0);
              return label;
            }
            return prevLabel;
          });
        }}
      />

      {/* Overlay */}
      <div className="overlay">
        <h1>Brandon's Portfolio</h1>
        <button className="contact-btn" onClick={() => setContactOpen((v) => !v)}>
          Contact Me
        </button>
      </div>

      {/* Contact Panel */}
      <div className={`contact-panel ${contactOpen ? 'show' : ''}`}>
        <div className="contact-row">
          <div className="contact-icon"><img src="/Projects/Githubicon.png" alt="GitHub" /></div>
          <div className="contact-text">
            <a href="https://github.com/CoderBrandonGonzalez" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

        <div className="contact-row">
          <div className="contact-icon"><img src="/Projects/LinkedInicon.png" alt="LinkedIn" /></div>
          <div className="contact-text">
            <a href="https://www.linkedin.com/in/brandon-gonzalezuic/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="contact-row">
          <div className="contact-icon"><img src="/Projects/Emailicon.png" alt="Email" /></div>
          <div className="contact-text"><a>BrandonGonzalezMail@gmail.com</a></div>
        </div>

        <div className="contact-row">
          <div className="contact-icon"><img src="/Projects/Phoneicon.png" alt="Phone" /></div>
          <div className="contact-text"><a>+1(630) 891-0359</a></div>
        </div>
      </div>

      {/* Horizontal Bar */}
      <div className={`bar ${expanded ? 'expanded' : ''}`}>
        <button className="open-btn" onClick={handleOpenClick}>
          {activeLabel === 'Home' ? 'Welcome!' : 'Open'}
        </button>
      </div>

      {/* Text Box */}
      <div className={`text-box ${expanded ? 'expanded' : ''}`}>
        <p className="glowing-text">{currentContent.title}</p>

        <div className="inner-box" style={{ display: expanded ? 'flex' : 'none' }}>
          {/* Image Side */}
          <div className="image-side">
            <img
              src={currentContent.image}
              alt={currentContent.title}
            />
          </div>

          {/* Description Side */}
          <div className="description-side">
            <p>{currentContent.description}</p>
          </div>
        </div>

        {/* Navigation Arrows + Circles */}
        {expanded && showNavigation && (
          <div className="arrow-buttons">
            <button className="arrow-btn left" onClick={handleLeftClick}>←</button>

            <div className="circle-container">
              {Array.from({ length: getPagesForLabel(activeLabel) }).map((_, index) => (
                <div key={index} className={`circle ${activeCircle === index ? 'active' : ''}`}></div>
              ))}
            </div>

            <button className="arrow-btn right" onClick={handleRightClick}>→</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================
// Section 5: Export
// ==========================
export default App;
