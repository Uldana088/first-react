import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FlightContext } from "./FlightContext";

function FlightBooking() {
  const { flightId } = useParams();
  const { flights, bookings, setBookings } = useContext(FlightContext);
  const flight = flights.find((f) => f.id === flightId);
  const [form, setForm] = useState({ name: "", date: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBooking = () => {
    if (!form.name || !form.date) {
      setMessage("Toltyrynyz");
      return;
    }

    const newBooking = {
      ...form,
      flightId,
    };
    setBookings([...bookings, newBooking]);
    setMessage("brondau satty otty");
  };

  if (!flight) return <p>flight not found</p>;

  return (
    <div className="container">
      <h2>page flight</h2>
      <div className="booking-container">
        <div className="flight-info">
          <h4>flight</h4>
          <p>
            {flight.from} to {flight.to} ({flight.price} T)
          </p>
          <p>Time: {flight.time}</p>
          <p>Airline: {flight.airline}</p>
          <p>Available seats: {flight.seats}</p>
        </div>
        <div className="booking-form">
          <h4>Information</h4>
          <div className="form-group">
            <input
              className="form-input"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleBooking}>Accept</button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>Back up</button>
          </div>
          {message && (
            <p className={`message ${message.includes("brondau") ? "success-message" : "error-message"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightBooking;
