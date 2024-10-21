import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import sawVideo from '../assets/Saw.mp4';
import pirateVideo from '../assets/Pirate.mp4';
import background from '../assets/background.png';
import background_nokey from '../assets/background_nokey.png';
import keyIcon from '../assets/key-icon.png';
import clockIcon from '../assets/clock-icon.png';
import heartIcon from '../assets/heart-icon.png';
import '../styles/EscapeRoom.css';  // Desktop styles
import '../styles/test.css';  // Mobile styles

// Hook to detect if the screen is mobile-sized
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const HomePage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="app-container">
      {isMobile ? (
        // Mobile Version
        <>
          <div className="main-container_t" style={{ backgroundImage: `url(${background})` }}>
            <h1 className="main-title_t">
              <img src="src/assets/logoEscapeF.png" alt="Logo" className="logoEscape_t" />
            </h1>
            <div className="scenario-container_t">
              <h2>Consultez nos scénarios !</h2>
              <FontAwesomeIcon icon={faChevronDown} className="menu-arrow" />
            </div>
          </div>
          <div className="fullscreen-section">
            <video className="content-video" autoPlay loop muted>
              <source src={sawVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay">
              <h2 className="video-title">Saw</h2>
              <p className="video-description">A thrilling escape room experience.</p>
              <button className="cta-btn"><Link id="link" to="/Saw">Learn more →</Link></button>
            </div>
          </div>

          <div className="fullscreen-section">
            <video className="content-video" autoPlay loop muted>
              <source src={pirateVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay">
              <h2 className="video-title">Pirates of the Caribbean</h2>
              <p className="video-description">Join the adventure on the high seas.</p>
              <button className="cta-btn"><Link id="link" to="/Pirates">Learn more →</Link></button>
            </div>
          </div>

          <div className="main-container_t" style={{ backgroundImage: `url(${background_nokey})` }}>
            <h2>C’est quoi une escape room?</h2>
            <div className="escape-info_t">
              <div className="info-block_t">
                <img src={keyIcon} alt="Key Icon" className="icon" />
                <h3>Vous êtes enfermé pendant 60 min</h3>
                <p>Vous n'apporterez rien à l'intérieur, mais la pièce sera remplie d'indices et d’objets qui ne sont pas forcément tous utiles ! À vous d’en dévoiler les secrets.</p>
              </div>
            </div>
          </div>

          <div className="main-container_t" style={{ backgroundImage: `url(${background_nokey})` }}>
            <div className="escape-info_t">
              <div className="info-block_t">
                <img src={clockIcon} alt="Clock Icon" className="icon"/>
                <h3>L'horloge tourne</h3>
                <p>Arriverez-vous à vous frayer un chemin jusqu'à la conclusion intrigante et échapper de la pièce en 60 minutes?</p>
              </div>
            </div>
          </div>

          <div className="main-container_t" style={{ backgroundImage: `url(${background_nokey})` }}>
            <div className="escape-info_t">
              <div className="info-block_t">
                <img src={heartIcon} alt="Heart Icon" className="icon"/>
                <h3>Sentir l'atmosphère</h3>
                <p>Dans des décors authentiques, inspirés de vos films préférés, vous devrez résoudre des énigmes, manipuler des objets et découvrir des passages secrets pour réussir votre mission. Cette fois-ci, vous êtes vraiment les héros du film!</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Desktop Version
        <>
          <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
            <h1 className="main-title"><img src="src/assets/logoEscapeF.png" alt="Logo" className="logoEscape" /></h1>
            <div className="scenario-container">
              <h2>Consulter nos scenario</h2>
              <div className="scenario-cards">
                <div className="card">
                  <img src="src/assets/saw.png" alt="Saw" />
                  <h3>SAW</h3>
                  <p><Link id="link" to="/Saw">Learn more →</Link></p>
                </div>
                <div className="card">
                  <img src="src/assets/pirate.png" alt="Pirates" />
                  <h3>Pirates of the Caribbean</h3>
                  <p><Link id="link" to="/Pirates">Learn more →</Link></p>
                </div>
                <div className="card">
                  <img src="src/assets/cannibal.png" alt="Le Cannibal" />
                  <h3>Le Cannibal</h3>
                  <p><Link id="link" to="/Cannibal">Learn more →</Link></p>
                </div>
              </div>
            </div>

            <h2>C’est quoi une escape room?</h2>
            <div className="escape-info">
              <div className="info-block">
                <img src={keyIcon} alt="Key Icon" className="icon" />
                <h3>Vous êtes enfermé pendant 60 min</h3>
                <p>Vous n'apporterez rien à l'intérieur, mais la pièce sera remplie d'indices et d’objets qui ne sont pas forcément tous utiles ! À vous d’en dévoiler les secrets.</p>
              </div>
              <div className="info-block">
                <img src={clockIcon} alt="Clock Icon" className="icon"/>
                <h3>L'horloge tourne</h3>
                <p>Arriverez-vous à vous frayer un chemin jusqu'à la conclusion intrigante et échapper de la pièce en 60 minutes?</p>
              </div>
              <div className="info-block">
                <img src={heartIcon} alt="Heart Icon" className="icon"/>
                <h3>Sentir l'atmosphère</h3>
                <p>Dans des décors authentiques, inspirés de vos films préférés, vous devrez résoudre des énigmes, manipuler des objets et découvrir des passages secrets pour réussir votre mission. Cette fois-ci, vous êtes vraiment les héros du film!</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
