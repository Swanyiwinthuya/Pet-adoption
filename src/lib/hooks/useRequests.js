'use client';

import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api';

export function useRequests(initialFilters = {}) {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 25,
  });

  // Fetch requests with filters
  const fetchRequests = useCallback(async (newFilters = filters, page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams = {
        ...newFilters,
        page,
        limit: pagination.itemsPerPage,
      };

      const response = await apiClient.getRequests(queryParams);
      
      setRequests(response.requests || []);
      setPagination({
        currentPage: response.currentPage || 1,
        totalPages: response.totalPages || 1,
        totalItems: response.totalItems || 0,
        itemsPerPage: response.itemsPerPage || 25,
      });
    } catch (err) {
      console.error('Failed to fetch requests:', err);
      setError(err.message);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.itemsPerPage]);

  // Apply filters
  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    fetchRequests(newFilters, 1);
  }, [fetchRequests]);

  // Change page
  const changePage = useCallback((page) => {
    fetchRequests(filters, page);
  }, [fetchRequests, filters]);

  // Initial load
  useEffect(() => {
    fetchRequests();
  }, []);

  // Refresh requests list
  const refresh = useCallback(() => {
    fetchRequests(filters, pagination.currentPage);
  }, [fetchRequests, filters, pagination.currentPage]);

  return {
    requests,
    isLoading,
    error,
    filters,
    pagination,
    applyFilters,
    changePage,
    refresh,
  };
}

// Hook for single request
export function useRequest(requestId) {
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequest = useCallback(async () => {
    if (!requestId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.getRequestById(requestId);
      setRequest(response);
    } catch (err) {
      console.error('Failed to fetch request:', err);
      setError(err.message);
      setRequest(null);
    } finally {
      setIsLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  const refresh = useCallback(() => {
    fetchRequest();
  }, [fetchRequest]);

  return {
    request,
    isLoading,
    error,
    refresh,
  };
}

// Hook for request CRUD operations
export function useRequestMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRequest = useCallback(async (requestData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.createRequest(requestData);
      return { success: true, data: response };
    } catch (err) {
      console.error('Failed to create request:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRequest = useCallback(async (requestId, requestData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.updateRequest(requestId, requestData);
      return { success: true, data: response };
    } catch (err) {
      console.error('Failed to update request:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRequestStatus = useCallback(async (requestId, status, notes = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.updateRequest(requestId, { status, notes });
      return { success: true, data: response };
    } catch (err) {
      console.error('Failed to update request status:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteRequest = useCallback(async (requestId) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.deleteRequest(requestId);
      return { success: true };
    } catch (err) {
      console.error('Failed to delete request:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createRequest,
    updateRequest,
    updateRequestStatus,
    deleteRequest,
    isLoading,
    error,
  };
}

// Hook for user's own requests
export function useMyRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // This would typically include user ID in the filter
      const response = await apiClient.getRequests({ userOwned: true });
      setRequests(response.requests || []);
    } catch (err) {
      console.error('Failed to fetch user requests:', err);
      setError(err.message);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyRequests();
  }, [fetchMyRequests]);

  const refresh = useCallback(() => {
    fetchMyRequests();
  }, [fetchMyRequests]);

  return {
    requests,
    isLoading,
    error,
    refresh,
  };
}
