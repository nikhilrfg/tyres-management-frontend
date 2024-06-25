import React, { useState, useEffect } from 'react';
import './EditTyreForm.css';

function EditTyreForm({ tyre, onEditSubmit }) {
  const [brand, setBrand] = useState(tyre.brand);
  const [model, setModel] = useState(tyre.model);
  const [size, setSize] = useState(tyre.size);

  useEffect(() => {
    setBrand(tyre.brand);
    setModel(tyre.model);
    setSize(tyre.size);
  }, [tyre]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditSubmit({ id: tyre.id, brand, model, size }); // Avoid using the spread operator here
  };

  const handleCancel = () => {
    onEditSubmit(null);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-tyre-form">
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
      <button type="submit">Update Tyre</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default EditTyreForm;
