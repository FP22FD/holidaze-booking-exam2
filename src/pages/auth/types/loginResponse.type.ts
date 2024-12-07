import { Avatar } from '../../../types/avatar.types';
import { Banner } from '../../../types/banner.types';
import { Meta } from '../../../types/meta.types';

export interface LoginResponse {
  data: UserData;
  meta: Meta;
}

export interface UserData {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
  accessToken: string;
  venueManager: boolean;
  _count: Count;
}

export interface Count {
  venues: number;
  bookings: number;
}
