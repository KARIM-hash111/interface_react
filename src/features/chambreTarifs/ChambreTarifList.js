import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChambreTarifs, deleteChambreTarif } from "./chambreTarifsSlice";
import { Link } from "react-router-dom";

function ChambreTarifList() {
  const dispatch = useDispatch();
  const { chambreTarifs, loading, error } = useSelector(
    (state) => state.chambreTarifs
  );

  useEffect(() => {
    dispatch(fetchChambreTarifs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      await dispatch(deleteChambreTarif(id));
      dispatch(fetchChambreTarifs());
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>🔗 Room-Tariff Associations List</h2>
      <Link to="/chambre-tarifs/add">➕ Add Association</Link>
      <ul>
        {chambreTarifs.map((item) => (
          <li key={item.id_chambre_tarif || item.id}>
            ID: {item.id_chambre_tarif || item.id} | Price: {item.prix} | Room
            ID: {item.id_chambre} | Tariff ID: {item.id_tarif} | Created at:{" "}
            {item.created_at} | Updated at: {item.updated_at}
            <Link
              to={`/chambre-tarifs/edit/${item.id_chambre_tarif || item.id}`}
            >
              {" "}
              ✏️ Edit
            </Link>
            <button
              onClick={() => handleDelete(item.id_chambre_tarif || item.id)}
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChambreTarifList;
