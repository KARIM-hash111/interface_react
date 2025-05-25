// 📁 src/features/reservations/EditReservation.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReservation, fetchReservations } from './reservationsSlice';
import { useParams, useNavigate } from 'react-router-dom';

function EditReservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservations);
  // Use id_reservation or id for finding the reservation
  const reservation = reservations.find(
    (r) => r.id_reservation === parseInt(id) || r.id === parseInt(id)
  );

  const [form, setForm] = useState({
    date_depart: "",
    date_fin: "",
    mode_paiement: "",
  });

  useEffect(() => {
    if (!reservation) {
      dispatch(fetchReservations());
    } else {
      setForm({
        date_depart: reservation.date_depart || reservation.date_debut || "",
        date_fin: reservation.date_fin || "",
        mode_paiement: reservation.mode_paiement || "",
      });
    }
  }, [reservation, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReservation({ id, data: form }));
    navigate("/reservations");
  };

  // Only show loading if reservations are empty and reservation not found
  if (!reservation && (!reservations || reservations.length === 0))
    return <p>Loading reservation...</p>;
  if (!reservation) return <p>Reservation not found.</p>;

  return (
    <div>
      <h2>Edit Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="date_depart"
            value={form.date_depart}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="date_fin"
            value={form.date_fin}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Payment Mode:</label>
          <select
            name="mode_paiement"
            value={form.mode_paiement}
            onChange={handleChange}
            required
          >
            <option value="">Select payment mode</option>
            <option value="carte_bancaire">Carte bancaire</option>
            <option value="especes">Espèces</option>
            <option value="virement">Virement</option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditReservation;