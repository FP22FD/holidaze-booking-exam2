import { API_DATA_PROFILE, API_KEY } from '../../../shared/utils/endpoints';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { useEffect, useState } from 'react';
import { ProfileData } from '../../../types/profile.type';
import { Booking } from '../../../types/booking.types';
import { Count, GetProfileResponse } from '../types/getProfileResponse.type';

export function useDataProfile(name: string | undefined) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileCount, setProfileCount] = useState<Count | null>(null);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const profileController = new AbortController();
    const { signal } = profileController;

    const fetchData = async (name: string) => {
      setLoading(true);
      try {
        const response = await fetch(API_DATA_PROFILE(name), {
          signal,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'X-Noroff-API-Key': API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const profileData: GetProfileResponse = await response.json();

          if (!profileController.signal.aborted) {
            const data = profileData.data;
            setProfileData(profileData.data);
            setProfileCount(profileData.data._count);

            const currentDate = new Date();
            data.bookings = data.bookings.filter((booking) => new Date(booking.dateTo) >= currentDate);

            setUpcomingBookings(data.bookings);
            setError('');
          }
        } else {
          const eh = new ErrorHandler(response);
          const msg = await eh.getErrorMessage();
          setError(msg);
          setProfileData(null);
          setProfileCount(null);
          setUpcomingBookings(null);
        }
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError('Could not show the upcoming bookings!');
          setProfileData(null);
          setProfileCount(null);
          setUpcomingBookings(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchData(name);
    }

    return () => {
      profileController.abort();
    };
  }, [name]);

  return { profileData, profileCount, upcomingBookings, loading, error };
}
