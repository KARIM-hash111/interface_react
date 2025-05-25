// 📁 src/features/tarifs/AddTarif.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTarif } from "./tarifsSlice";
import { useNavigate } from "react-router-dom";

function AddTarif() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prix: "",
    description: "",
    type: "standard",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTarif({
        nom: form.nom,
        prix: parseFloat(form.prix),
        description: form.description || null,
        type: form.type,
      })
    );
    navigate("/tarifs");
  };

  return (
    <div>
      <h2>➕ Add New Tarif</h2>
      <form onSubmit={handleSubmit}>    
        <div>
          <label>Type:</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="standard">Standard</option>
            <option value="flex">Flex</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <div>
          <label>Description (optional):</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">💾 Save</button>
      </form>
    </div>
  );
}

export default AddTarif;
