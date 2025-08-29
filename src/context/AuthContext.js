'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'admin'
  });

  // Mock login function
  const login = async (credentials) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always return success
    return { success: true };
  };

  // Mock register function
  const register = async (userData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always return success
    return { success: true };
  };

  // Mock logout function
  const logout = async () => {
    // For demo purposes, just log the action
    console.log('User logged out');
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always return success
    return { success: true, user: { ...user, ...profileData } };
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: true, // Always authenticated for demo
    login,
    register,
    logout,
    isAdmin,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
