import React, { useState, useEffect } from 'react';
import TyreForm from './TyreForm';
import EditTyreForm from './EditTyreForm';
import './Tyres.css';

function Tyres() {
  const [tyres, setTyres] = useState([]);
  const [editTyre, setEditTyre] = useState(null);

  const fetchTyres = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3025/tyres', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTyres(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTyres();
  }, []);

  const handleAddTyre = async (newTyre) => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:3025/tyres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTyre),
      });
      fetchTyres();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditTyre = async (updatedTyre) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:3025/tyres/${updatedTyre.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTyre),
      });
      setEditTyre(null);
      fetchTyres();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteTyre = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:3025/tyres/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTyres();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="tyres-container">
      <h2>Tyre Management</h2>
      {editTyre ? (
        <EditTyreForm tyre={editTyre} onEditSubmit={handleEditTyre} />
      ) : (
        <TyreForm onSubmit={handleAddTyre} />
      )}
      <ul>
        {tyres.map((tyre) => (
          <li key={tyre.id}>
            {tyre.brand} {tyre.model} {tyre.size}
            <button onClick={() => setEditTyre(tyre)}>Edit</button>
            <button onClick={() => handleDeleteTyre(tyre.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tyres;
