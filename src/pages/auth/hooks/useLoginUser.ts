import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_LOGIN, API_KEY } from '../../../shared/utils/endpoints';
import { useState } from 'react';
import { LoginResponse, UserData } from '../types/loginResponse.type';

export function useLoginUser() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function loginUser(
    email: string,
    password: string,
  ): Promise<{ success: boolean; data: null | UserData; accessToken: string | null }> {
    try {
      setLoading(true);

      const response = await fetch(API_LOGIN, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData: LoginResponse = await response.json();

        return { success: true, data: userData.data, accessToken: userData.data.accessToken };
      } else {
        const eh = new ErrorHandler(response);
        const msg = await eh.getErrorMessage();
        setError(msg);

        return { success: false, data: null, accessToken: null };
      }
    } catch {
      setError('Could not login. Please try again!');
      return { success: false, data: null, accessToken: null };
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, loginUser };
}
