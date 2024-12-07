import { API_BOOKING, API_KEY } from '../../../shared/utils/endpoints';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { useState } from 'react';

export interface BookingResponse {
  data: BookingData;
  meta: Record<string, unknown>;
}

export interface BookingData {
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export type CreateBookingRequest = Pick<BookingData, 'dateFrom' | 'dateTo' | 'guests'>;

export function useCreateBooking(): {
  createBooking: (data: CreateBookingRequest) => Promise<{ success: boolean; data: BookingData | null }>;
  loading: boolean;
  error: string;
} {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const createBooking = async (data: CreateBookingRequest) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_BOOKING, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const venueData: BookingResponse = await response.json();

        const data = venueData.data;
        return { success: true, data };
      } else {
        const eh = new ErrorHandler(response);
        const msg = await eh.getErrorMessage();
        setError(msg);

        return { success: false, data: null };
      }
    } catch {
      setError('Could not create the booking!');
    } finally {
      setLoading(false);
    }

    return { success: false, data: null };
  };

  return { loading, error, createBooking };
}
