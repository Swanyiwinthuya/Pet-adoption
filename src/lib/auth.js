// Authentication utilities
import apiClient from './api';

export const AUTH_STORAGE_KEY = 'pet_adoption_auth';

export class AuthManager {
  constructor() {
    this.token = null;
    this.user = null;
    this.isInitialized = false;
  }

  // Initialize auth state from localStorage
  initialize() {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { token, user } = JSON.parse(stored);
        this.token = token;
        this.user = user;
        apiClient.setAuthToken(token);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      this.clearAuth();
    }

    this.isInitialized = true;
  }

  // Login user
  async login(credentials) {
    try {
      const response = await apiClient.login(credentials);
      const { token, user } = response;

      this.token = token;
      this.user = user;
      
      apiClient.setAuthToken(token);
      this.persistAuth();

      return { success: true, user };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Register user
  async register(userData) {
    try {
      const response = await apiClient.register(userData);
      const { token, user } = response;

      this.token = token;
      this.user = user;
      
      apiClient.setAuthToken(token);
      this.persistAuth();

      return { success: true, user };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Logout user
  async logout() {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    }

    this.clearAuth();
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Check if user is admin
  isAdmin() {
    return this.user?.role === 'admin';
  }

  // Get auth token
  getToken() {
    return this.token;
  }

  // Persist auth state to localStorage
  persistAuth() {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          token: this.token,
          user: this.user,
        })
      );
    } catch (error) {
      console.error('Failed to persist auth:', error);
    }
  }

  // Clear auth state
  clearAuth() {
    this.token = null;
    this.user = null;
    apiClient.setAuthToken(null);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  // Refresh user data
  async refreshUser() {
    if (!this.isAuthenticated()) return;

    try {
      const user = await apiClient.getCurrentUser();
      this.user = user;
      this.persistAuth();
      return user;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      this.clearAuth();
      throw error;
    }
  }
}

// Create and export singleton instance
const authManager = new AuthManager();
export default authManager;
