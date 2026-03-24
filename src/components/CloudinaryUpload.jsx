import React, { useState } from 'react';

const CloudinaryUpload = ({ onImageUpload, buttonText = "Subir Imagen" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'imagenes'); // El preset que indicaste

    try {
      // Reemplaza "djhlieqmd" por tu cloud name
      const res = await fetch('https://api.cloudinary.com/v1_1/djhlieqmd/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        // Llama a la funcion prop con la URL segura devuelta por Cloudinary
        onImageUpload(data.secure_url);
      } else {
        setError('No se pudo obtener la URL de la imagen.');
      }
    } catch (err) {
      console.error('Error al subir la imagen:', err);
      setError('Hubo un error al subir la imagen.');
    } finally {
      setLoading(false);
      // Limpia el input para que pueda seleccionar la misma imagen de ser necesario
      e.target.value = null;
    }
  };

  return (
    <div className="cloudinary-upload-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label 
        style={{
          display: 'inline-block',
          padding: '10px 15px',
          backgroundColor: '#004aad',
          color: 'white',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Subiendo...' : buttonText}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload} 
          disabled={loading} 
          style={{ display: 'none' }} 
        />
      </label>
      {error && <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>{error}</p>}
    </div>
  );
};

export default CloudinaryUpload;
