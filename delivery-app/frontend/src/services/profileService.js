// services/profileService.js

const API_URL = "http://localhost:3001/api";

const getToken = () => localStorage.getItem("token");

// Obtener direcciones
export const getAddresses = async () => {
  const res = await fetch(`${API_URL}/addresses`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return await res.json();
};

// Crear
export const createAddress = async (address) => {
  const res = await fetch(`${API_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(address)
  });

  return await res.json();
};

// Actualizar
export const updateAddress = async (id, address) => {
  const res = await fetch(`${API_URL}/addresses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(address)
  });

  return await res.json();
};

// Eliminar
export const deleteAddress = async (id) => {
  await fetch(`${API_URL}/addresses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};