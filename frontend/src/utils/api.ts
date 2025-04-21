const BASE_URL = '/api';

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  },
};