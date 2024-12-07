import { useState, useEffect } from 'react';
import { AllVenuesResponse } from '../../../types/venues.type';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_VENUES } from '../../../shared/utils/endpoints';
import { Venue } from '../../../types/venue.type';

export function useFetchVenues() {
  const [data, setData] = useState<Venue[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const venuesController = new AbortController();
    const { signal } = venuesController;

    const fetchData = async () => {
      try {
        const response = await fetch(API_VENUES, { signal });

        if (response.ok) {
          const venuesData: AllVenuesResponse = await response.json();

          if (!venuesController.signal.aborted) {
            const data = venuesData.data;
            setData(data);

            setError('');
          }
        } else {
          const eh = new ErrorHandler(response);
          const msg = await eh.getErrorMessage();
          setError(msg);
          setData(null);
        }
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError('Could not show the venues!');
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      venuesController.abort();
    };
  }, []);

  return { data, loading, error };
}
