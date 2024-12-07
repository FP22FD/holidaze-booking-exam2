import { Avatar } from '../../../types/avatar.types';
import { Facilities } from '../../../types/facilities.types';
import { Media } from '../../../types/media.types';
import { Meta } from '../../../types/meta.types';
import { Location } from '../../../types/location.types';
import { Owner } from '../../../types/owner.types';
import { Banner } from '../../../types/banner.types';

export interface DashboardResponse {
  data: AdminVenueData[];
  meta: Meta;
}

export interface AdminVenueData {
  bookings: Booking[];
  created: string;
  description: string;
  id: string;
  location: Location;
  maxGuests: number;
  media: Media[];
  meta: Facilities;
  name: string;
  owner: Owner;
  price: number;
  rating: number;
  updated: string;
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

export interface Customer {
  name: string;
  email: string;
  bio?: string;
  avatar: Avatar;
  banner: Banner;
}

export interface Count {
  bookings: number;
}
