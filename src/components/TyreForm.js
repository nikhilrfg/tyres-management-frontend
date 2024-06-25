import React, { useState } from 'react';
import './TyreForm.css';

function TyreForm({ onSubmit }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ brand, model, size });
    setBrand('');
    setModel('');
    setSize('');
  };

  return (
    <form onSubmit={handleSubmit} className="tyre-form">
      <input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        required
      />
      <button type="submit">Add Tyre</button>
    </form>
  );
}

export default TyreForm;
