'use client';

import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api';

export function useAdopters(initialFilters = {}) {
  const [adopters, setAdopters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 25,
  });

  // Fetch adopters with filters
  const fetchAdopters = useCallback(async (newFilters = filters, page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = {
        ...newFilters,
        page,
        limit: pagination.itemsPerPage,
      };

      const response = await apiClient.getAdopters(queryParams);
      
      setAdopters(response.adopters || []);
      setPagination({
        currentPage: response.currentPage || 1,
        totalPages: response.totalPages || 1,
        totalItems: response.totalItems || 0,
        itemsPerPage: response.itemsPerPage || 25,
      });
    } catch (err) {
      console.error('Failed to fetch adopters:', err);
      setError(err.message);
      setAdopters([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.itemsPerPage]);

  // Apply filters
  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    fetchAdopters(newFilters, 1);
  }, [fetchAdopters]);

  // Change page
  const changePage = useCallback((page) => {
    fetchAdopters(filters, page);
  }, [fetchAdopters, filters]);

  // Initial load
  useEffect(() => {
    fetchAdopters();
  }, []);

  // Refresh adopters list
  const refresh = useCallback(() => {
    fetchAdopters(filters, pagination.currentPage);
  }, [fetchAdopters, filters, pagination.currentPage]);

  return {
    adopters,
    isLoading,
    error,
    filters,
    pagination,
    applyFilters,
    changePage,
    refresh,
  };
}

// Hook for single adopter
export function useAdopter(adopterId) {
  const [adopter, setAdopter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdopter = useCallback(async () => {
    if (!adopterId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.getAdopterById(adopterId);
      setAdopter(response);
    } catch (err) {
      console.error('Failed to fetch adopter:', err);
      setError(err.message);
      setAdopter(null);
    } finally {
      setIsLoading(false);
    }
  }, [adopterId]);

  useEffect(() => {
    fetchAdopter();
  }, [fetchAdopter]);

  const refresh = useCallback(() => {
    fetchAdopter();
  }, [fetchAdopter]);

  return {
    adopter,
    isLoading,
    error,
    refresh,
  };
}

// Hook for adopter CRUD operations
export function useAdopterMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAdopter = useCallback(async (adopterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.createAdopter(adopterData);
      return { success: true, data: response };
    } catch (err) {
      console.error('Failed to create adopter:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAdopter = useCallback(async (adopterId, adopterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.updateAdopter(adopterId, adopterData);
      return { success: true, data: response };
    } catch (err) {
      console.error('Failed to update adopter:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAdopter = useCallback(async (adopterId) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.deleteAdopter(adopterId);
      return { success: true };
    } catch (err) {
      console.error('Failed to delete adopter:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createAdopter,
    updateAdopter,
    deleteAdopter,
    isLoading,
    error,
  };
}
