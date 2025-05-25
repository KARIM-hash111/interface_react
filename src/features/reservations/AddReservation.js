// 📁 src/features/reservations/AddReservation.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReservation } from "./reservationsSlice";
import { fetchChambreTarifs } from "../chambreTarifs/chambreTarifsSlice";
import { useNavigate } from "react-router-dom";
import AddChambreTarif from "../chambreTarifs/AddChambreTarif";

function AddReservation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date_depart: "",
    date_fin: "",
    statut: "en_attente",
    mode_paiement: "carte_bancaire",
    id_client: "",
    id_chambre_tarif: "",
  });
  const [showChambreTarifForm, setShowChambreTarifForm] = useState(false);
  const [chambreTarifSaved, setChambreTarifSaved] = useState(false);

  // Fetch chambre_tarifs for select options
  const { chambreTarifs } = useSelector((state) => state.chambreTarifs);
  useEffect(() => {
    dispatch(fetchChambreTarifs());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReservation(form));
    navigate("/reservations");
  };

  // Handler to show the chambre-tarif form
  const handleShowChambreTarifForm = () => {
    setShowChambreTarifForm(true);
    setChambreTarifSaved(false);
  };

  // Handler to call after chambre-tarif is saved
  const handleChambreTarifSaved = () => {
    setChambreTarifSaved(true);
    setShowChambreTarifForm(false);
    dispatch(fetchChambreTarifs());
  };

  return (
    <div>
      <h2>Add New Reservation</h2>
      <button
        type="button"
        onClick={handleShowChambreTarifForm}
        style={{ marginBottom: 16 }}
      >
        ➕ Create Room-Tariff Association
      </button>
      {showChambreTarifForm && (
        <div
          style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}
        >
          <AddChambreTarif onSave={handleChambreTarifSaved} noRedirect />
          <button
            type="button"
            onClick={() => setShowChambreTarifForm(false)}
            style={{ marginTop: 8 }}
          >
            Close
          </button>
        </div>
      )}
      {/* Optionally show a message after save */}
      {chambreTarifSaved && (
        <div style={{ color: "green", marginBottom: 16 }}>
          Room-Tariff Association created successfully!
        </div>
      )}
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
          <label>Status:</label>
          <select
            name="statut"
            value={form.statut}
            onChange={handleChange}
            required
          >
            <option value="confirmee">Confirmée</option>
            <option value="annulee">Annulée</option>
            <option value="en_attente">En attente</option>
          </select>
        </div>
        <div>
          <label>Payment Mode:</label>
          <select
            name="mode_paiement"
            value={form.mode_paiement}
            onChange={handleChange}
            required
          >
            <option value="carte_bancaire">Carte bancaire</option>
            <option value="especes">Espèces</option>
            <option value="virement">Virement</option>
          </select>
        </div>
        <div>
          <label>Client ID:</label>
          <input
            type="select"
            placeholder="Client ID"
            name="id_client"
            value={form.id_client}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Room-Tariff Association (ID):</label>
          <select
            name="id_chambre_tarif"
            value={form.id_chambre_tarif}
            onChange={handleChange}
            required
          >
            <option value="">Select Room-Tariff ID</option>
            {chambreTarifs &&
              chambreTarifs.map((ct) => (
                <option
                  key={ct.id_chambre_tarif || ct.id}
                  value={ct.id_chambre_tarif || ct.id}
                >
                  {ct.id_chambre_tarif || ct.id}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddReservation;
