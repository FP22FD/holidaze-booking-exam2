import { useState } from 'react';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_KEY, API_VENUE } from '../../../shared/utils/endpoints';
import { Venue, VenueResponse } from '../../../types/venue.type';
import { EditVenueRequest } from './useCreateVenue';

export function useUpdateVenue(): {
  updateVenue: (id: string, data: EditVenueRequest) => Promise<{ success: boolean; data: Venue | null }>;
  loading: boolean;
  error: string;
} {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const updateVenue = async (id: string, data: EditVenueRequest) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_VENUE(id), {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const profileData: VenueResponse = await response.json();

        const data = profileData.data;
        return { success: true, data };
      } else {
        const eh = new ErrorHandler(response);
        const msg = await eh.getErrorMessage();
        setError(msg);

        return { success: false, data: null };
      }
    } catch {
      setError('Could not update the venue!');
    } finally {
      setLoading(false);
    }

    return { success: false, data: null };
  };

  return { loading, error, updateVenue };
}
