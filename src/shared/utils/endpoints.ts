//storage API endpoints
// cspell:ignore holidaze

// Base URL and API Key from environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY || '__VITE_API_KEY__';

// Constants for path segments
export const API_AUTH = '/auth';

// Auth endpoints
export const API_REGISTER = new URL(`${API_BASE_URL}${API_AUTH}/register`);
export const API_LOGIN = new URL(`${API_BASE_URL}${API_AUTH}/login/?_holidaze=true`);

// Venues endpoints
export const API_VENUES = new URL(`${API_BASE_URL}/holidaze/venues`);
export const API_VENUES_SEARCH = (query: string) =>
  new URL(`${API_BASE_URL}/holidaze/venues/search?limit=10&sort=name&sortOrder=asc&q=${query}`);
export const API_VENUE = (id: string) => new URL(`${API_BASE_URL}/holidaze/venues/${id}/?_owner=true&_bookings=true`);
export const API_VENUE_CREATE = new URL(`${API_BASE_URL}/holidaze/venues`);
export const API_BOOKING = new URL(`${API_BASE_URL}/holidaze/bookings`);

// Profile data endpoints
export const API_UPDATE_PROFILE = (name: string) => new URL(`${API_BASE_URL}/holidaze/profiles/${name}`);
export const API_DATA_PROFILE = (name: string) =>
  new URL(`${API_BASE_URL}/holidaze/profiles/${name}/?_venues=true&_bookings=true`);

// Admin data endpoints
export const API_DATA_ADMIN = (name: string) =>
  new URL(`${API_BASE_URL}/holidaze/profiles/${name}/venues/?_owner=true&_bookings=true&_customer=true`);
