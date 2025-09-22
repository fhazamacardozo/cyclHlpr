// src/utils/api.js
// Módulo centralizado para llamadas a la API

const API_BASE_URL = 'http://localhost:5000/api'; // Cambia esto según tu backend

export async function apiGet(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`GET ${endpoint} failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error in apiGet: ${error.message}`);
        throw error;
    }
}

export async function apiPost(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`POST ${endpoint} failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error in apiPost: ${error.message}`);
        throw error;
    }
}


