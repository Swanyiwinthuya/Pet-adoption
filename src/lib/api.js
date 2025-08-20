// API client for Pet Adoption Management System
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = null;
  }

  setAuthToken(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Pet API methods
  async getPets(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    return this.request(`/pets?${queryParams}`);
  }

  async getPetById(id) {
    return this.request(`/pets/${id}`);
  }

  async createPet(petData) {
    return this.request('/pets', {
      method: 'POST',
      body: JSON.stringify(petData),
    });
  }

  async updatePet(id, petData) {
    return this.request(`/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(petData),
    });
  }

  async deletePet(id) {
    return this.request(`/pets/${id}`, {
      method: 'DELETE',
    });
  }

  // Adopter API methods
  async getAdopters(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    return this.request(`/adopters?${queryParams}`);
  }

  async getAdopterById(id) {
    return this.request(`/adopters/${id}`);
  }

  async createAdopter(adopterData) {
    return this.request('/adopters', {
      method: 'POST',
      body: JSON.stringify(adopterData),
    });
  }

  async updateAdopter(id, adopterData) {
    return this.request(`/adopters/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adopterData),
    });
  }

  async deleteAdopter(id) {
    return this.request(`/adopters/${id}`, {
      method: 'DELETE',
    });
  }

  // Adoption Request API methods
  async getRequests(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    return this.request(`/requests?${queryParams}`);
  }

  async getRequestById(id) {
    return this.request(`/requests/${id}`);
  }

  async createRequest(requestData) {
    return this.request('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async updateRequest(id, requestData) {
    return this.request(`/requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
  }

  async deleteRequest(id) {
    return this.request(`/requests/${id}`, {
      method: 'DELETE',
    });
  }

  // Authentication API methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;
