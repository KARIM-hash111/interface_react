// 📁 src/features/tarifs/EditTarif.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTarif, fetchTarifs } from "./tarifsSlice";
import { useParams, useNavigate } from "react-router-dom";

function EditTarif() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tarifs } = useSelector((state) => state.tarifs);
  const tarif = tarifs.find((t) => t.id_tarif === parseInt(id));
  const [form, setForm] = useState({ description: "", type: "" });

  useEffect(() => {
    if (!tarif) {
      dispatch(fetchTarifs());
    } else {
      setForm({
        description: tarif.description || "",
        type: tarif.type || "standard",
      });
    }
  }, [tarif, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTarif({
        id: parseInt(id),
        data: {
          description: form.description || null,
          type: form.type,
        },
      })
    );
    navigate("/tarifs");
  };

  if (!tarif) return <p>⏳ Loading data...</p>;

  return (
    <div>
      <h2>✏️ Edit Tarif</h2>
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
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">✅ Save Changes</button>
      </form>
    </div>
  );
}

export default EditTarif;
