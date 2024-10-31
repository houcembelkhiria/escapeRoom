import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import sawVideo from '../assets/Saw.mp4';
import pirateVideo from '../assets/Pirate.mp4';
import background from '../assets/background.png';
import keyIcon from '../assets/key-icon.png';
import clockIcon from '../assets/clock-icon.png';
import heartIcon from '../assets/heart-icon.png';
import '../styles/EscapeRoom.css';  // Desktop styles
import '../styles/test.css';  // Mobile styles



const Spinner: React.FC = () => (
  <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
  </div>
);
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

interface Chapter {
  _id: string; // Ensure this matches your API response
  title: string;
  description: string;
  image: string;
  video: string;
  path: string; // This might not be necessary depending on your routing structure
}

const HomePage: React.FC = () => {
  const isMobile = useIsMobile();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch chapters from the API
  useEffect(() => {
    axios.get('http://localhost:5000/api/chapters')
      .then(response => {
        setChapters(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching chapters:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="app-container">
      {isMobile ? (
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

          {chapters.map(chapter => (
            <div key={chapter._id} className="fullscreen-section">
              <video className="content-video" autoPlay loop muted >
                <source src={chapter.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-overlay">
                <h2 className="video-title">{chapter.title}</h2>
                <p className="video-description">{chapter.description}</p>
                <button className="cta-btn">
                  <Link id="link" to={`/${chapter._id}`}>Learn more →</Link>
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
            <h1 className="main-title">
              <img src="src/assets/logoEscapeF.png" alt="Logo" className="logoEscape" />
            </h1>
            <div className="scenario-container">
              <h2>Consulter nos scenarios</h2>
              <div className="scenario-cards">
                {chapters.map(chapter => (
                  <div key={chapter._id} className="card"> {/* Use _id here as well */}
                    <img src={chapter.image} alt={chapter.title} loading="lazy" />
                    <h3>{chapter.title}</h3>
                    <p>
                      <Link id="link" to={`/${chapter._id}`}>Learn more →</Link> {/* Fix here as well */}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <h2>C’est quoi une escape room?</h2>
            <div className="escape-info">
              <div className="info-block">
                <img src={keyIcon} alt="Key Icon" className="icon" loading="lazy"/>
                <h3>Vous êtes enfermé pendant 60 min</h3>
                <p>Vous n'apporterez rien à l'intérieur, mais la pièce sera remplie d'indices et d’objets qui ne sont pas forcément tous utiles ! À vous d’en dévoiler les secrets.</p>
              </div>
              <div className="info-block">
                <img src={clockIcon} alt="Clock Icon" className="icon" loading="lazy" />
                <h3>L'horloge tourne</h3>
                <p>Arriverez-vous à vous frayer un chemin jusqu'à la conclusion intrigante et échapper de la pièce en 60 minutes?</p>
              </div>
              <div className="info-block">
                <img src={heartIcon} alt="Heart Icon" className="icon" loading="lazy" />
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
