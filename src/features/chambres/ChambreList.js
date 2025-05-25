import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChambres, deleteChambre } from "./chambresSlice";
import { Link } from "react-router-dom";

function ChambreList() {
  const dispatch = useDispatch();
  const { chambres, loading, error } = useSelector((state) => state.chambres);

  useEffect(() => {
    dispatch(fetchChambres());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      await dispatch(deleteChambre(id));
      dispatch(fetchChambres());
    }
  };

  if (loading) return <p className="text-center py-4">Loading rooms...</p>;
  if (error)
    return <p className="text-center py-4 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">📋 Rooms List</h2>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          ➕ Add Room
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {chambres.map((chambre) => (
            <li key={chambre.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">
                    🆔 {chambre.id_chambre} | 🛏️ type: {chambre.type}
                  </span>
                  <p className="text-gray-600">
                    Description: {chambre.description} <br />
                    Base Price: {chambre.base_price} <br />
                    Capacity: {chambre.capacite} <br />
                    Available: {chambre.disponibilite ? "Yes" : "No"} <br />
                    Created at: {chambre.created_at}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link
                    to={`/edit/${chambre.id_chambre}`}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(chambre.id_chambre)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChambreList;
