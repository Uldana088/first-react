import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FlightContext } from "./FlightContext";

function FlightList() {
  const [loading, setLoading] = useState(true);
  const [SearchTerm, SetSearchTerm] = useState('');
  const { flights, setFlights } = useContext(FlightContext);
  const navigate = useNavigate();

  const mockFlights = [
    { id: "1", from: "Almaty", to: "Astana", price: 15000, time: '10:00', airline: 'Air Astana', seats: 50 },
    { id: "2", from: "USA", to: "Almaty", price: 12000, time: '12:00', airline: 'AIRBUS', seats: 43 },
    { id: "3", from: "Shymkent", to: "Taraz", price: 14000, time: '14:00', airline: 'SCAT ', seats: 17 },
    { id: "4", from: "Astana", to: "Almaty", price: 20000, time: '16:00', airline: 'Qazaq Air', seats: 235 },
    { id: "5", from: "Almaty", to: "Shymkent", price: 16000, time: '18:00', airline: 'Air Astana', seats: 1234 },
    { id: "6", from: "Taraz", to: "Astana", price: 17000, time: '20:00', airline: 'Air Astana', seats: 98 }
  ];

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setTimeout(() => {
      setFlights(mockFlights);
      setLoading(false);
    }, 1000);
  };

  const filteredFlights = flights.filter(flights =>
    flights.from.toLowerCase().includes(SearchTerm.toLowerCase()) ||
    flights.to.toLowerCase().includes(SearchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading....</div>;

  return (
    <div className="container">
      <h1>Uzhaq reisy</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={SearchTerm}
          onChange={(e) => SetSearchTerm(e.target.value)}
          placeholder="Search flights..."
        />
      </div>

      <div className="flight-list">
        {filteredFlights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-header">
              <h2 className="flight-route">{flight.from} - {flight.to}</h2>
              <span className="flight-price">{flight.price.toLocaleString()} KZT</span>
            </div>
            <div className="flight-details">
              <p className="flight-detail">Uaqyt: {flight.time}</p>
              <p className="flight-detail">AviaCompany: {flight.airline}</p>
              <p className="flight-detail">Bos oryndar: {flight.seats}</p>
            </div>
            <button 
              className="order-btn"
              onClick={() => navigate(`/booking/${flight.id}`)}
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightList;
