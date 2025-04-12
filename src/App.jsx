import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FlightProvider } from "./FlightContext";
import FlightList from "./FlightList";
import FlightBooking from "./FlightBooking";
import "./App.css";

export default function App() {
  return (
    <FlightProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FlightList />} />
          <Route path="/booking/:flightId" element={<FlightBooking />} />
        </Routes>
      </BrowserRouter>
    </FlightProvider>
  );
}
