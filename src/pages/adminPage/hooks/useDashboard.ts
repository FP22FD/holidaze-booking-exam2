import { API_DATA_ADMIN, API_KEY } from '../../../shared/utils/endpoints';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { useEffect, useState } from 'react';
import { AdminVenueData, DashboardResponse } from '../types/dashboardResponse.type';

export interface AdminVenuesStats {
  bookings: number;
  venues: number;
}

export function useVenueManagement(name: string | undefined) {
  const [venuesData, setVenuesData] = useState<AdminVenueData[] | null>(null);
  const [stats, setStats] = useState<AdminVenuesStats | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const adminController = new AbortController();
    const { signal } = adminController;

    const fetchData = async (name: string) => {
      setLoading(true);
      try {
        const response = await fetch(API_DATA_ADMIN(name), {
          signal,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'X-Noroff-API-Key': API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const venuesData: DashboardResponse = await response.json();

          if (!adminController.signal.aborted) {
            const data = venuesData.data;
            const bookings = data.reduce((tot, venue) => tot + venue._count.bookings, 0);

            setVenuesData(data);
            setStats({ venues: data.length, bookings });

            setError('');
          }
        } else {
          const eh = new ErrorHandler(response);
          const msg = await eh.getErrorMessage();
          setError(msg);
          setVenuesData(null);
          setStats(null);
        }
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError('Could not show the upcoming bookings!');
          setVenuesData(null);
          setStats(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchData(name);
    }

    return () => {
      adminController.abort();
    };
  }, [name, step]);

  const loadVenues = () => {
    setStep((x) => x + 1);
  };

  return {
    venuesData: venuesData,
    stats: stats,
    loading,
    error,
    loadVenues,
  };
}
