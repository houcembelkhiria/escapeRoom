// pirateEscapeRoom.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import background from '../assets/background_nokey.png';
import '../styles/PiratesEscapeRoom.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faStar } from '@fortawesome/free-solid-svg-icons';

interface Chapter {
  _id: string;
  name: string;
  image: string;
  playerNumber: number;
  time: number;
  difficulty: string;
  description: string;
  place: string;
}

const PirateEscapeRoom: React.FC = () => {
  const [chapterData, setChapterData] = useState<Chapter | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/chapters/6717f73d24efc03c9b3f6462')
      .then((response) => {
        setChapterData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!chapterData) return <p>Loading...</p>;

  return (
    <div
      className="pirate-container_big"
      style={{ backgroundImage: `url(${background})` }}
    >
      <h1 className="pirate-title">{chapterData.name}</h1>
      <div className="escape-room">
        <img src={chapterData.image} alt={chapterData.name} className="img" />
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
          2-8 Joueurs
        </li>
        <li>
          {[...Array(3)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="starOrange" />
          ))}
          {[...Array(2)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="starBlack" />
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
