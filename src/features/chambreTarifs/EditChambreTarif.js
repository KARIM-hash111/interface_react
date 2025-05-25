import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChambreTarif, fetchChambreTarifs } from "./chambreTarifsSlice";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditChambreTarif() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chambreTarifs } = useSelector((state) => state.chambreTarifs);
  // Use id_chambre_tarif or id for finding the selected item
  const selected = chambreTarifs.find(
    (item) => item.id_chambre_tarif === parseInt(id) || item.id === parseInt(id)
  );

  const [form, setForm] = useState({
    id_chambre: "",
    id_tarif: "",
  });

  const [rooms, setRooms] = useState([]);
  const [tarifs, setTarifs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/chambres")
      .then((res) => setRooms(res.data));
    axios
      .get("http://localhost:8000/api/tarifs")
      .then((res) => setTarifs(res.data));
  }, []);

  useEffect(() => {
    if (!selected) {
      dispatch(fetchChambreTarifs());
    } else {
      setForm({
        id_chambre: selected.id_chambre,
        id_tarif: selected.id_tarif,
      });
    }
  }, [selected, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateChambreTarif({ id, data: form }));
    navigate("/chambre-tarifs");
  };

  if (!selected) return <p>Loading data...</p>;

  return (
    <div>
      <h2>Edit Room-Tariff Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room:</label>
          <select
            name="id_chambre"
            value={form.id_chambre}
            onChange={handleChange}
            required
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option
                key={room.id_chambre || room.id}
                value={room.id_chambre || room.id}
              >
                {room.type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tariff:</label>
          <select
            name="id_tarif"
            value={form.id_tarif}
            onChange={handleChange}
            required
          >
            <option value="">Select a tariff</option>
            {tarifs.map((tarif) => (
              <option
                key={tarif.id_tarif || tarif.id_Tarif}
                value={tarif.id_tarif || tarif.id_Tarif}
              >
                {tarif.id_tarif || tarif.id_Tarif}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditChambreTarif;
