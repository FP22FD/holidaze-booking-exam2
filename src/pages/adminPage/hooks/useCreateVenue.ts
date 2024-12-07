import { useState } from 'react';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_KEY, API_VENUE_CREATE } from '../../../shared/utils/endpoints';
import { Venue, VenueResponse } from '../../../types/venue.type';

export type EditVenueRequest = Pick<
  Venue,
  'name' | 'description' | 'media' | 'price' | 'maxGuests' | 'rating' | 'location' | 'meta'
>;

export function useCreateVenue(): {
  createVenue: (data: EditVenueRequest) => Promise<{ success: boolean; data: Venue | null }>;
  loading: boolean;
  error: string;
} {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const createVenue = async (data: EditVenueRequest) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_VENUE_CREATE, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const venueData: VenueResponse = await response.json();

        const data = venueData.data;
        return { success: true, data };
      } else {
        const eh = new ErrorHandler(response);
        const msg = await eh.getErrorMessage();
        setError(msg);

        return { success: false, data: null };
      }
    } catch {
      setError('Could not create the venue!');
    } finally {
      setLoading(false);
    }

    return { success: false, data: null };
  };

  return { loading, error, createVenue };
}
