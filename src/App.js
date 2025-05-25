// 📁 src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChambreList from './features/chambres/ChambreList';
import AddChambre from './features/chambres/AddChambre';
import EditChambre from './features/chambres/EditChambre';
import TarifList from './features/tarifs/TarifList';
import AddTarif from './features/tarifs/AddTarif';
import EditTarif from './features/tarifs/EditTarif';
import ChambreTarifList from './features/chambreTarifs/ChambreTarifList';
import AddChambreTarif from './features/chambreTarifs/AddChambreTarif';
import EditChambreTarif from './features/chambreTarifs/EditChambreTarif';
import ReservationList from './features/reservations/ReservationList';
import AddReservation from './features/reservations/AddReservation';
import EditReservation from './features/reservations/EditReservation';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hotel Management System</h1>
        <Routes>
          <Route path="/" element={<ChambreList />} />
          <Route path="/add" element={<AddChambre />} />
          <Route path="/edit/:id" element={<EditChambre />} />
          <Route path="/tarifs" element={<TarifList />} />
          <Route path="/tarifs/add" element={<AddTarif />} />
          <Route path="/tarifs/edit/:id" element={<EditTarif />} />
          <Route path="/chambre-tarifs" element={<ChambreTarifList />} />  
          <Route path="/chambre-tarifs/add" element={<AddChambreTarif />} />
          <Route path="/chambre-tarifs/edit/:id" element={<EditChambreTarif />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/reservations/add" element={<AddReservation />} />
          <Route path="/reservations/edit/:id" element={<EditReservation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;