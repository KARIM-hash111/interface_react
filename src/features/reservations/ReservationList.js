// 📁 src/features/reservations/ReservationList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, deleteReservation } from "./reservationsSlice";
import { Link } from "react-router-dom";

function ReservationList() {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector(
    (state) => state.reservations
  );

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      await dispatch(deleteReservation(id));
      dispatch(fetchReservations());
    }
  };

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>📋 Reservations List</h2>
      <Link to="/reservations/add">➕ Add Reservation</Link>
      <ul>
        {reservations.map((res) => (
          <li key={res.id_reservation}>
            Reservation ID: {res.id_reservation} | Start: {res.date_depart} |
            End: {res.date_fin} | Total Amount: {res.montant_total} | Status:{" "}
            {res.statut} | Payment: {res.mode_paiement} | Client ID:{" "}
            {res.id_client} | Room-Tariff ID: {res.id_chambre_tarif}
            <Link to={`/reservations/edit/${res.id_reservation}`}>
              {" "}
              ✏️ Edit
            </Link>
            <button onClick={() => handleDelete(res.id_reservation)}>
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
