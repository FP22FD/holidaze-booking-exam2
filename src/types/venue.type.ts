import { Facilities } from './facilities.types';
import { Location } from './location.types';
import { Media } from './media.types';
import { Meta } from './meta.types';

export interface VenueResponse {
  data: Venue;
  meta?: Meta;
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
  _count: Count;
}

export interface Count {
  bookings: number;
}
