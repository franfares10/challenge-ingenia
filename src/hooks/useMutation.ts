import { useState, useCallback } from 'react';
import api from '../api/api';

type HttpMethod = 'POST' | 'PUT';

interface MutationOptions {
  method: HttpMethod;
  url: string;
}

export const useMutation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const executeMutation = useCallback(
    async (options: MutationOptions, data: any) => {
      setLoading(true);
      setError(false);

      try {
        let response;

        if (options.method === 'POST') {
          response = await api.post(options.url, data);
        } else if (options.method === 'PUT') {
          response = await api.put(options.url, data);
        }
        
      } catch (error: unknown) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { executeMutation, loading, error };
};
