import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addChambre } from "./chambresSlice";
import { useNavigate } from "react-router-dom";

function AddChambre() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "",
    description: "",
    base_price: 0,
    capacite: 1,
    disponibilite: true,
    id_Tarif: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addChambre({
        ...form,
        base_price: parseFloat(form.base_price),
        capacite: parseInt(form.capacite),
        disponibilite: Boolean(form.disponibilite),
        id_Tarif: parseInt(form.id_Tarif),
      })
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 text-right">
            إدارة الغرف والتعريقات والربط
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">
            3. Rooms & Rates Management
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-8">
          <h3 className="text-lg font-medium text-gray-800 mb-6 border-b pb-2">
            Add New Room
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Room Type */}
              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="text-sm font-medium text-gray-700 text-right">
                  Type
                </label>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="e.g. Deluxe Suite"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="text-sm font-medium text-gray-700 text-right">
                  Description
                </label>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Room features and details"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Base Price */}
              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="text-sm font-medium text-gray-700 text-right">
                  Base Price
                </label>
                <div className="col-span-2 flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500">
                    DH
                  </span>
                  <input
                    type="number"
                    name="base_price"
                    value={form.base_price}
                    onChange={handleChange}
                    className="flex-1 block w-full px-4 py-2 rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Capacity */}
              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="text-sm font-medium text-gray-700 text-right">
                  Capacity
                </label>
                <div className="col-span-2">
                  <input
                    type="number"
                    name="capacite"
                    value={form.capacite}
                    onChange={handleChange}
                    className="w-20 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Available */}
              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="text-sm font-medium text-gray-700 text-right">
                  Available
                </label>
                <div className="col-span-2">
                  <input
                    type="checkbox"
                    name="disponibilite"
                    checked={form.disponibilite}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tariff ID */}
              <div className="grid grid-cols-3 gap-6 items-center">
                <label className="text-sm font-medium text-gray-700 text-right">
                  Tariff ID
                </label>
                <div className="col-span-2">
                  <input
                    type="number"
                    name="id_Tarif"
                    value={form.id_Tarif}
                    onChange={handleChange}
                    className="w-20 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 grid grid-cols-3 gap-6">
                <div className="col-start-2 col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Room
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddChambre;
