import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';

export const useFetch = <T extends unknown>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (error: unknown) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
