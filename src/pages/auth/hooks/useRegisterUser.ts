import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_REGISTER } from '../../../shared/utils/endpoints';
import { useState } from 'react';
import { RegisterResponse, UserData } from '../types/registerResponse.type';

export function useRegisterUser() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function registerUser(
    name: string,
    email: string,
    password: string,
    manager: boolean,
  ): Promise<{ success: boolean; data: null | UserData }> {
    try {
      setLoading(true);

      const response = await fetch(API_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          venueManager: manager,
        }),
      });

      if (response.ok) {
        const userData: RegisterResponse = await response.json();

        return { success: true, data: userData.data };
      } else {
        const eh = new ErrorHandler(response);
        const msg = await eh.getErrorMessage();
        setError(msg);

        return { success: false, data: null };
      }
    } catch {
      setError('Could not register. Please try again!');
    } finally {
      setLoading(false);
    }
    return { success: false, data: null };
  }
  return { loading, error, registerUser };
}
