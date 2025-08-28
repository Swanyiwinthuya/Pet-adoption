'use client';

import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api';

export function usePets(initialFilters = {}) {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 25,
  });

  // Fetch pets with filters
  const fetchPets = useCallback(async (newFilters = filters, page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = {
        ...newFilters,
        page,
        limit: pagination.itemsPerPage,
      };

      const response = await apiClient.getPets(queryParams);
      
      setPets(response.pets || []);
      setPagination({
        currentPage: response.currentPage || 1,
        totalPages: response.totalPages || 1,
        totalItems: response.totalItems || 0,
        itemsPerPage: response.itemsPerPage || 25,
      });
    } catch (err) {
      console.error('Failed to fetch pets:', err);
      setError(err.message);
      setPets([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.itemsPerPage]);

  // Apply filters
  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    fetchPets(newFilters, 1);
  }, [fetchPets]);

  // Change page
  const changePage = useCallback((page) => {
    fetchPets(filters, page);
  }, [fetchPets, filters]);

  // Initial load
  useEffect(() => {
    fetchPets();
  }, []);

  // Refresh pets list
  const refresh = useCallback(() => {
    fetchPets(filters, pagination.currentPage);
  }, [fetchPets, filters, pagination.currentPage]);

  return {
    pets,
    isLoading,
    error,
    filters,
    pagination,
    applyFilters,
    changePage,
    refresh,
  };
}

// Hook for single pet
export function usePet(petId) {
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPet = useCallback(async () => {
    if (!petId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.getPetById(petId);
      setPet(response);
    } catch (err) {
      console.error('Failed to fetch pet:', err);
      setError(err.message);
      setPet(null);
    } finally {
      setIsLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    fetchPet();
  }, [fetchPet]);

  const refresh = useCallback(() => {
    fetchPet();
  }, [fetchPet]);

  return {
    pet,
    isLoading,
    error,
    refresh,
  };
}

// Hook for pet CRUD operations
export function usePetMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPet = useCallback(async (petData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.createPet(petData);
      return { success: true, data: response };
    } catch (err) {
      console.error('Failed to create pet:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePet = useCallback(async (petId, petData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.updatePet(petId, petData);
      return { success: true, data: response };
    } catch (err) {
      console.error('Failed to update pet:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePet = useCallback(async (petId) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.deletePet(petId);
      return { success: true };
    } catch (err) {
      console.error('Failed to delete pet:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createPet,
    updatePet,
    deletePet,
    isLoading,
    error,
  };
}
