import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access the URL parameters
import axios from 'axios';
import background from '../assets/background_nokey.png';
import '../styles/PiratesEscapeRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';




const Spinner: React.FC = () => (
    <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
    </div>
  );
interface Chapter {
  _id: string;
  name: string;
  image: string;
  playerNumber: number;
  time: number;
  difficulty: string; // Assume this is one of "easy", "medium", or "hard"
  description: string;
  place: string;
}

const PirateEscapeRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the 'id' from the URL
  const [chapterData, setChapterData] = useState<Chapter | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/chapters/${id}`) // Use the ID in the API request
        .then((response) => {
          setChapterData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id]); // Add 'id' as a dependency to refetch if it changes

  if (!chapterData) return <p><Spinner/></p>;

  // Map difficulty to the number of stars
  const difficultyStars = {
    easy: 2,
    medium: 3,
    hard: 5,
  };

  // Get the number of stars based on the chapter's difficulty
  const starCount = difficultyStars[chapterData.difficulty] || 0;

  return (
    <div
      className="pirate-container_big"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="pirate-title">{chapterData.name}</h1>
      <div className="escape-room">
        {/* Added loading="lazy" for lazy loading */}
        <img src={chapterData.image} alt={chapterData.name} className="img" loading="lazy" />
        <div className="details">
          <h2>{chapterData.name}</h2>
          <ul>
            <li>
              <img
                src="src/assets/logoPersonne.png"
                alt="Player Icon"
                className="logo"
              />
              {chapterData.playerNumber} Joueurs
            </li>
            <li>
              <img
                src="src/assets/logoMinuteur.png"
                alt="Timer Icon"
                className="logo"
              />
              {chapterData.time} Minutes
            </li>
            <li>
              <img
                src="src/assets/logoLieux.png"
                alt="Location Icon"
                className="logo"
              />
              {chapterData.place}
            </li>
          </ul>
          <div className="parent-container-arrow">
            <FontAwesomeIcon icon={faChevronDown} className="chapter-arrow" />
          </div>
          <div className="button-container">
            <button className="reserve-button">Réserver Maintenant</button>
          </div>
        </div>
      </div>
      <ul className="info-list">
        <li>
          <img
            src="src/assets/logoPersonne.png"
            alt="Player Icon"
            className="logo"
          />
          2-{chapterData.playerNumber} Joueurs
        </li>
        <li>
          {/* Render stars based on the chapter's difficulty */}
          {[...Array(starCount)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="starOrange" />
          ))}
          {[...Array(5 - starCount)].map((_, i) => (
            <FontAwesomeIcon key={i + starCount} icon={faStar} className="starBlack" />
          ))}{' '}
          Difficulté
        </li>
        <li>
          <img
            src="src/assets/logoMinuteur.png"
            alt="Timer Icon"
            className="logo"
          />
          {chapterData.time} Minutes
        </li>
      </ul>
      <div className="textBottompirate">
        <p className="pirate-description">{chapterData.description}</p>
      </div>
    </div>
  );
};

export default PirateEscapeRoom;
