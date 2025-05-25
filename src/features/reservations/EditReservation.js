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
  const reservation = reservations.find((r) => r.id === parseInt(id));

  const [form, setForm] = useState({
    id_Client: '',
    id_Chambre: '',
    date_debut: '',
    date_fin: ''
  });

  useEffect(() => {
    if (!reservation) {
      dispatch(fetchReservations());
    } else {
      setForm({ ...reservation });
    }
  }, [reservation, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReservation({ id, data: form }));
    navigate('/reservations');
  };

  if (!reservation) return <p>Loading reservation...</p>;

  return (
    <div>
      <h2>Edit Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Client ID:</label>
          <input type="number" name="id_Client" value={form.id_Client} onChange={handleChange} required />
        </div>
        <div>
          <label>Room ID:</label>
          <input type="number" name="id_Chambre" value={form.id_Chambre} onChange={handleChange} required />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="date_debut" value={form.date_debut} onChange={handleChange} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="date_fin" value={form.date_fin} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditReservation;