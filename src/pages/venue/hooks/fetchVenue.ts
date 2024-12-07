import { useEffect, useState } from 'react';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_VENUE } from '../../../shared/utils/endpoints';
import { Media } from '../../../types/media.types';
import { Meta } from '../../../types/meta.types';
import { Facilities } from '../../../types/facilities.types';
import { Location } from '../../../types/location.types';
import { Owner } from '../../../types/owner.types';
import { Customer } from '../../../types/customer.types';

export interface VenueResponse {
  data: Venue;
  meta: Meta;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Facilities;
  location: Location;
  owner: Owner;
  bookings: Booking[];
  _count: Count;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: Customer;
}

export interface Count {
  bookings: number;
}

export function useFetchVenue(id: string): { data: Venue | null; loading: boolean; error: string } {
  const [data, setData] = useState<Venue | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const venueController = new AbortController();
    const { signal } = venueController;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_VENUE(id), { signal });

        if (response.ok) {
          const venueData: VenueResponse = await response.json();
          const data = venueData.data;

          setData(data);
          setError('');
        } else {
          const eh = new ErrorHandler(response);
          const msg = await eh.getErrorMessage();
          setError(msg);
          setData(null);
        }
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError('Could not show the venue!');
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      venueController.abort();
    };
  }, [id]);

  return { data, loading, error };
}
