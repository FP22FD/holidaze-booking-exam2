import { Avatar } from '../../../types/avatar.types';
import { Banner } from '../../../types/banner.types';
import { Booking } from '../../../types/booking.types';
import { Meta } from '../../../types/meta.types';
import { Venue } from '../../../types/venue.type';

export interface GetProfileResponse {
  data: ProfileDataResponse;
  meta: Meta;
}

export interface ProfileDataResponse {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
  venues?: Venue[];
  bookings: Booking[];
  _count: Count;
}

export interface Count {
  venues: number;
  bookings: number;
}
