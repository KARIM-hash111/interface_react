// 📁 src/features/tarifs/TarifList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTarifs, deleteTarif } from "./tarifsSlice";
import { Link } from "react-router-dom";

function TarifList() {
  const dispatch = useDispatch();
  const { tarifs, loading, error } = useSelector((state) => state.tarifs);

  useEffect(() => {
    dispatch(fetchTarifs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("TU veux vraiment supprimer ce tarif ?")) {
      await dispatch(deleteTarif(id));
      dispatch(fetchTarifs());
    }
  };

  if (loading) return <p>LEADING...</p>;
  if (error) return <p>ERREUR: {error}</p>;

  return (
    <div>
      <h2>💸 LISTE DES TARIFS</h2>
      <Link to="/tarifs/add">➕ إضافة تعريف</Link>
      <ul>
        {tarifs.map((tarif) => (
          <li key={tarif.id_tarif}>
            Type: {tarif.type} | Created at: {tarif.created_at} | Updated at:
            {tarif.updated_at}- {tarif.description || "SANS DESCRIPTION"} |
            <Link to={`/tarifs/edit/${tarif.id_tarif}`}> ✏️ update</Link>
            <button onClick={() => handleDelete(tarif.id_tarif)}>
              🗑 delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TarifList;
