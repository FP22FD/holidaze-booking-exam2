import { useState } from 'react';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_UPDATE_PROFILE, API_KEY } from '../../../shared/utils/endpoints';
import { UpdateProfileResponse } from '../types/updateProfile.type';
import { ProfileData } from '../../../types/profile.type';

export function useUpdateProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const updateProfile = async (profileData: ProfileData) => {
    try {
      setLoading(true);

      const response = await fetch(API_UPDATE_PROFILE(profileData.name), {
        method: 'PUT',
        body: JSON.stringify(profileData),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const profileData: UpdateProfileResponse = await response.json();

        const data = profileData.data;
        return { success: true, data };
      } else {
        const eh = new ErrorHandler(response);
        const msg = await eh.getErrorMessage();
        setError(msg);

        return { success: false, data: null };
      }
    } catch {
      setError('Could not update the profile!');
    } finally {
      setLoading(false);
    }

    return { success: false, data: null };
  };

  return { loading, error, updateProfile };
}
