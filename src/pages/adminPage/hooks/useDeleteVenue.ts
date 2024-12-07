import { useState } from 'react';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_KEY, API_VENUE } from '../../../shared/utils/endpoints';

export function useDeleteVenue(): {
  deleteVenue: (id: string) => Promise<{ success: boolean }>;
  loading: boolean;
  error: string;
} {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const deleteVenue = async (id: string): Promise<{ success: boolean }> => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_VENUE(id), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const eh = new ErrorHandler(response);
        const msg = await eh.getErrorMessage();
        setError(msg);
        return { success: false };
      }
      return { success: true };
    } catch {
      setError('Could not delete the venue!');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteVenue };
}
