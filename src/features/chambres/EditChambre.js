import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChambre, fetchChambres } from "./chambresSlice";
import { useParams, useNavigate } from "react-router-dom";

function EditChambre() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chambres } = useSelector((state) => state.chambres);
  const chambre = chambres.find((c) => c.id_chambre === parseInt(id));
  const [form, setForm] = useState({
    type: "",
    description: "",
    base_price: 0,
    capacite: 1,
    disponibilite: true,
    id_Tarif: 1,
  });

  useEffect(() => {
    if (!chambre) {
      dispatch(fetchChambres());
    } else {
      setForm({ ...chambre });
    }
  }, [chambre, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateChambre({ id: parseInt(id), data: form }));
    navigate("/");
  };

  if (!chambre) return <p className="text-center py-4">⏳ Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">✏️ Edit Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Room Type:</label>
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Description:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Base Price:</label>
          <input
            type="number"
            name="base_price"
            value={form.base_price}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Capacity:</label>
          <input
            type="number"
            name="capacite"
            value={form.capacite}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="text-gray-700 mr-2">Available?</label>
          <input
            type="checkbox"
            name="disponibilite"
            checked={form.disponibilite}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Tariff ID:</label>
          <input
            type="number"
            name="id_Tarif"
            value={form.id_Tarif}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditChambre;
