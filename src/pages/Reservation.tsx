import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import background from '../assets/background_nokey.png';
import '../styles/Reservation.css';
import 'react-calendar/dist/Calendar.css';

const Reservation: React.FC = () => {
    const [date, setDate] = useState<Date | [Date, Date]>(new Date());
    const [formData, setFormData] = useState({
        fullName: '',
        scenario: '',
        time: '',
        email: '',
        numberOfPlayers: 2,
    });
    const specialTimeSlots = ['17:30', '19:00'];
    const fullTimeSlots = ['13:00', '14:30', '16:00'];
    // Handle calendar date change
    const handleDateChange: CalendarProps['onChange'] = (value) => {
        setDate(value as Date | [Date, Date]);
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Log form data for now, replace with API call or backend integration
        console.log('Reservation Data:', {
            ...formData,
            date, // Include selected date in the reservation
        });
        alert('Reservation submitted!');
    };
    const getNextSlotEndTime = (startTime: string) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const endTime = new Date();
        endTime.setHours(hours + (minutes === 30 ? 1 : 1), minutes === 30 ? 0 : 30);
        const endHours = endTime.getHours().toString().padStart(2, '0');
        const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
        return `${endHours}:${endMinutes}`;
    };

    return (
        <div className="reservation-container" style={{ backgroundImage: `url(${background})` }}>
            <h1>Réservation</h1>
            <h2>Tarifs :</h2>
            
            {/* Options Section */}
            <div className="options">
                <div className="option">
                    <h2>2 Joueurs</h2>
                    <p>40dt par personne</p>
                </div>
                <div className="option">
                    <h2>3 Joueurs</h2>
                    <p>35dt par personne</p>
                </div>
                <div className="option">
                    <h2>4+ Joueurs</h2>
                    <p>30dt par personne</p>
                </div>
            </div>

            {/* Calendar Section */}
            <div className="calendar">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    maxDetail="month"
                />
            </div>

            {/* Reservation Form Section */}
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
                        <option value="Saw">Saw</option>
                        <option value="Pirates of the Caribbean">Pirates of the Caribbean</option>
                        {/* Add more options as necessary */}
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
                    {['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30', '22:00'].map((time) => (
                        <option
                            key={time}
                            value={time}
                            disabled={fullTimeSlots.includes(time)} // Disable the full slots
                            className={fullTimeSlots.includes(time) ? 'full-slot' : ''}
                            style={specialTimeSlots.includes(time) ? {  color: '#f26422' } : {}} // Highlight special slots
                        >
                            {time} - {getNextSlotEndTime(time)}
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

                <button type="submit" className="submit-btn">Réserver</button>
            </form>
        </div>
    );
};

export default Reservation;
