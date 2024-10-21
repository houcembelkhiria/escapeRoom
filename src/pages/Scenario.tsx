import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/background.png'; // Adjust path to your assets
import '../styles/Scenario.css';
import sawImage from '../assets/saw.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Scenario: React.FC = () => {
    return (
        <div className="scenario-container_big" style={{ backgroundImage: `url(${background})` }}>
            <div className="scenario-container_s">
                <div className="card_s">
                <img src={sawImage} alt="Saw" />
                    <div className="card-info">
                        <h3>SAW</h3>
                        <ul className="info-list_s">
      <li><img src="src/assets/logoPersonne.png" alt="Logo 1" className="logo_s"/> 2-8 Joueurs</li>
      <li><img src="src/assets/logoMinuteur.png" alt="Logo 3" className="logo_s"/> 60 Minutes</li>
      <li><img src="src/assets/logoLieux.png" alt="Logo 2" className="logo_s"/> Menzah 7</li>
    </ul>
    <h2><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starBlack'/></h2>
       
                        <p><Link id="link" to="/Saw">Learn more →</Link></p>                        </div>
                    </div>
                <div className="card_s">
                    <img src="src/assets/pirate.png" alt="Pirates" />
                    <div className="card-info">
                        <h3>Pirates of the Caribbean</h3>
                        <ul className="info-list_s">
      <li><img src="src/assets/logoPersonne.png" alt="Logo 1" className="logo_s"/> 2-8 Joueurs</li>
      <li><img src="src/assets/logoMinuteur.png" alt="Logo 3" className="logo_s"/> 60 Minutes</li>
      <li><img src="src/assets/logoLieux.png" alt="Logo 2" className="logo_s"/> Menzah 7</li>
    </ul>
    <h2><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starBlack'/></h2>
       
                        <p><Link id="link" to="/Pirates">Learn more →</Link></p>
                    </div>
                    </div>
                    <div className="card_s">
                        <img src="src/assets/cannibal.png" alt="Le Cannibal" />
                        <div className="card-info">
                        <h3>Le Cannibal</h3>
                        <ul className="info-list_s">
      <li><img src="src/assets/logoPersonne.png" alt="Logo 1" className="logo_s"/> 2-8 Joueurs</li>
      <li><img src="src/assets/logoMinuteur.png" alt="Logo 3" className="logo_s"/> 60 Minutes</li>
      <li><img src="src/assets/logoLieux.png" alt="Logo 2" className="logo_s"/> Menzah 7</li>
    </ul>
    <h2><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/><FontAwesomeIcon icon={faStar} className='starOrange'/></h2>
                            
                            <p><Link id="link" to="/Cannibal">Learn more →</Link></p>
                        </div>
                    </div>
            </div>
        </div>

    );
};

export default Scenario;
