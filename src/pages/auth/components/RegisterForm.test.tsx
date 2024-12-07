import { expect, test, describe, vi, beforeEach } from 'vitest';
import { render } from 'vitest-browser-react';
import { BrowserRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { PersistProvider } from '../../../store/PersistContext';
import { HelmetProvider } from 'react-helmet-async';
import { useRegisterUser } from '../hooks/useRegisterUser';

describe('RegisterForm', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the form correctly', async () => {
    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <RegisterForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    await expect.element(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    await expect.element(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    await expect.element(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await expect.element(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('shows validation messages on submitting empty form', async () => {
    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <RegisterForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    await screen.getByRole('button', { name: /register/i }).click();

    await expect.element(screen.getByText(/Please enter your name/i)).toBeVisible();
    await expect.element(screen.getByText(/Please enter your email address/i)).toBeVisible();
    await expect.element(screen.getByText(/Please enter your password/i)).toBeVisible();
  });

  test('validates name, email and password format', async () => {
    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <RegisterForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    await screen.getByLabelText(/Name/i).fill('fo');
    await screen.getByLabelText(/Email/i).fill('foo');
    await screen.getByLabelText(/Password/i).fill('1234');

    await screen.getByRole('button', { name: /register/i }).click();

    await expect.element(screen.getByText('Your name should be at least 3 characters')).toBeVisible();
    await expect.element(screen.getByText('Please enter a valid email address')).toBeVisible();
    await expect.element(screen.getByText('Password must be at least 8 characters')).toBeVisible();
  });

  test('submits form with valid data', async () => {
    vi.mock('../hooks/useRegisterUser');

    const mockRegisterUser = vi.fn().mockResolvedValueOnce({ success: true, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useRegisterUser as any).mockReturnValue({ registerUser: mockRegisterUser, loading: false, error: null });

    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <RegisterForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    await screen.getByLabelText(/Name/i).fill('Harry');
    await screen.getByLabelText(/Email/i).fill('harry@stud.noroff.no');
    await screen.getByLabelText(/Password/i).fill('12345678');

    await screen.getByRole('button', { name: /register/i }).click();

    await vi.waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledTimes(1);
      expect(mockRegisterUser).toHaveBeenCalledWith('Harry', 'harry@stud.noroff.no', '12345678', false);
    });
  });

  test('submits form with invalid data', async () => {
    vi.mock('../hooks/useRegisterUser');

    const mockRegisterUser = vi.fn().mockResolvedValueOnce({ success: true, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useRegisterUser as any).mockReturnValue({ registerUser: mockRegisterUser, loading: false, error: null });

    const screen = render(
      <PersistProvider>
        <HelmetProvider>
          <BrowserRouter>
            <RegisterForm />
          </BrowserRouter>
        </HelmetProvider>
      </PersistProvider>,
    );

    await screen.getByLabelText(/Name/i).fill('Ha');
    await screen.getByLabelText(/Email/i).fill('harry@.noroff.no');
    await screen.getByLabelText(/Password/i).fill('123');

    await screen.getByRole('button', { name: /register/i }).click();

    await vi.waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledTimes(0);
    });
  });
});
