import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addChambreTarif } from "./chambreTarifsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddChambreTarif() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    prix: "",
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do not send prix, let backend calculate it
    const payload = {
      id_chambre: form.id_chambre,
      id_tarif: form.id_tarif,
    };
    dispatch(addChambreTarif(payload));
    navigate("/chambre-tarifs");
  };

  return (
    <div>
      <h2>Add Room-Tariff Association</h2>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddChambreTarif;
