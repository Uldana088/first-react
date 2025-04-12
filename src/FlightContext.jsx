import { createContext, useState } from "react";

export const FlightContext = createContext();
export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);

  return (
    <FlightContext.Provider value={{
      flights, setFlights,
      bookings, setBookings
    }}>
      {children}
    </FlightContext.Provider>
  );
};
