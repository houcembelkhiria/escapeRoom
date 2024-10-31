import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background.png'; // Adjust path to your assets
import '../styles/Scenario.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Chapter {
    _id: string;
    name: string;
    image: string;
    playerNumber: number;
    time: number;
    difficulty: string; // Assume this is one of "easy", "medium", or "hard"
    place: string;
}

const Scenario: React.FC = () => {
    const [chapters, setChapters] = useState<Chapter[]>([]); // State to hold chapter data

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/chapters') // Adjust this endpoint according to your API
            .then((response) => {
                setChapters(response.data); // Assuming the API returns an array of chapters
            })
            .catch((error) => {
                console.error('Error fetching chapters:', error);
            });
    }, []);

    return (
        <div className="scenario-container_big" style={{ backgroundImage: `url(${background})` }}>
            <div className="scenario-container_s">
                {chapters.map((chapter) => {
                    // Map difficulty to the number of stars
                    const difficultyStars = {
                        easy: 2,
                        medium: 3,
                        hard: 5,
                    };

                    // Get the number of stars based on the chapter's difficulty
                    const starCount = difficultyStars[chapter.difficulty] || 0;

                    return (
                        <div key={chapter._id} className="card_s">
                            <img
                                src={chapter.image}
                                alt={chapter.name}
                                loading="lazy" // Enable lazy loading for images
                            />
                            <div className="card-info">
                                <h3>{chapter.name}</h3>
                                <ul className="info-list_s">
                                    <li>
                                        <img
                                            src="src/assets/logoPersonne.png"
                                            alt="Player Icon"
                                            className="logo_s"
                                        />
                                        {chapter.playerNumber} Joueurs
                                    </li>
                                    <li>
                                        <img
                                            src="src/assets/logoMinuteur.png"
                                            alt="Timer Icon"
                                            className="logo_s"
                                        />
                                        {chapter.time} Minutes
                                    </li>
                                    <li>
                                        <img
                                            src="src/assets/logoLieux.png"
                                            alt="Location Icon"
                                            className="logo_s"
                                        />
                                        {chapter.place}
                                    </li>
                                </ul>
                                <h2>
                                    {[...Array(starCount)].map((_, i) => (
                                        <FontAwesomeIcon key={i} icon={faStar} className='starOrange' />
                                    ))}
                                    {[...Array(5 - starCount)].map((_, i) => (
                                        <FontAwesomeIcon key={i + starCount} icon={faStar} className='starBlack' />
                                    ))}{' '}
                                    Difficulté
                                </h2>
                                <p>
                                <Link id="link" to={`/${chapter._id}`}>Learn more →</Link>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Scenario;
