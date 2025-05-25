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
    montant_total: "",
    statut: "en_attente",
    mode_paiement: "carte_bancaire",
    id_client: "",
    id_chambre_tarif: "",
  });
  const [showChambreTarifForm, setShowChambreTarifForm] = useState(false);

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

  return (
    <div>
      <h2>Add New Reservation</h2>
      <button
        type="button"
        onClick={() => setShowChambreTarifForm(true)}
        style={{ marginBottom: 16 }}
      >
        ➕ Create Room-Tariff Association
      </button>
      {showChambreTarifForm && (
        <div
          style={{ border: "1px solid #ddd", padding: 16, marginBottom: 16 }}
        >
          <AddChambreTarif />
          <button
            type="button"
            onClick={() => setShowChambreTarifForm(false)}
            style={{ marginTop: 8 }}
          >
            Close
          </button>
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
          <label>Total Amount:</label>
          <input
            type="number"
            name="montant_total"
            value={form.montant_total}
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
                <option key={ct.id_chambre_tarif || ct.id} value={ct.id_chambre_tarif || ct.id}>
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
