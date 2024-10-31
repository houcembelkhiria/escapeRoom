import React, { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import background from '../assets/background_nokey.png';
import '../styles/Reservation.css';
import 'react-calendar/dist/Calendar.css';

interface Scenario {
  _id: string;
  name: string;
}

interface TimeSlot {
  _id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const Reservation: React.FC = () => {
    const [date, setDate] = useState<Date | [Date, Date]>(new Date());
    const [formData, setFormData] = useState({
        fullName: '',
        scenario: '',
        time: '',
        email: '',
        numberOfPlayers: 2,
    });
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/scenarios')
            .then((response) => response.json())
            .then((data) => setScenarios(data))
            .catch((error) => {
                console.error('Error fetching scenarios:', error);
                setErrorMessage('Unable to load scenarios.');
            });
    }, []);

    const fetchAvailableTimeSlots = async (scenarioId: string, formattedDate: string) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
    
            const response = await fetch(
                `http://localhost:5000/api/timeSlots/scenario/${scenarioId}/${formattedDate}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include token in Authorization header
                    },
                }
            );
    
            if (!response.ok) {
                throw new Error('Failed to fetch time slots');
            }
    
            const timeSlots = await response.json();
            setAvailableTimeSlots(timeSlots.filter((slot: TimeSlot) => slot.isAvailable));
        } catch (error) {
            console.error('Error fetching time slots:', error);
            setErrorMessage('Unable to load time slots.');
        }
    };
    

    useEffect(() => {
        if (!formData.scenario || !date) return;
        const scenarioId = scenarios.find((s) => s.name === formData.scenario)?._id;
        const formattedDate = (date as Date).toISOString().split('T')[0];
        if (scenarioId) {
            fetchAvailableTimeSlots(scenarioId, formattedDate);
        }
    }, [formData.scenario, date, scenarios]);

    const handleDateChange: CalendarProps['onChange'] = (value) => {
        setDate(value as Date | [Date, Date]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        const payload = {
            ...formData,
            date: (date as Date).toISOString().split('T')[0],
        };

        try {
            const response = await fetch('http://localhost:5000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Reservation submitted successfully!');
                setFormData({
                    fullName: '',
                    scenario: '',
                    time: '',
                    email: '',
                    numberOfPlayers: 2,
                });
            } else {
                setErrorMessage(data.message || 'Failed to create reservation. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            setErrorMessage('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reservation-container" style={{ backgroundImage: `url(${background})` }}>
            <h1>Réservation</h1>
            <div className="calendar">
                <Calendar onChange={handleDateChange} value={date} maxDetail="month" />
            </div>

            <form className="reservation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Nom complet:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Entrez votre nom complet"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="scenario">Scénario:</label>
                    <select
                        id="scenario"
                        name="scenario"
                        value={formData.scenario}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">-- Choisissez un scénario --</option>
                        {scenarios.map((scenario) => (
                            <option key={scenario._id} value={scenario.name}>
                                {scenario.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="time">Heure:</label>
                    <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">-- Choisissez une heure --</option>
                        {availableTimeSlots.map((slot) => (
                            <option key={slot._id} value={slot.startTime}>
                                {slot.startTime} - {slot.endTime}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Adresse e-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Entrez votre adresse e-mail"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Nombre de joueurs:</label>
                    <input
                        type="number"
                        id="numberOfPlayers"
                        name="numberOfPlayers"
                        min="2"
                        value={formData.numberOfPlayers}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Réserver'}
                </button>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Reservation;
