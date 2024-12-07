import Layout from './shared/components/Layout';
import PageNotFound from './pages/notFound/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AuthPage from './pages/auth/AuthPage';
import { PersistProvider } from './store/PersistContext';
import { ErrorPage } from './pages/errorPage/ErrorPage';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import DashboardPage from './pages/adminPage/DashboardPage';
import VenueDetailPage from './pages/venue/VenueDetailPage';

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/venues/:id',
          element: <VenueDetailPage />,
        },
        {
          path: '/auth/login',
          element: <AuthPage />,
        },
        {
          path: '/auth/register',
          element: <AuthPage />,
        },
        {
          path: '/auth/register/admin',
          element: <AuthPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/admin',
          element: <DashboardPage />,
        },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return (
    <PersistProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </PersistProvider>
  );
}

export default App;
