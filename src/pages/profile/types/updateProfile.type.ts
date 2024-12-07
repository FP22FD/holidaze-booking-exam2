import { Avatar } from '../../../types/avatar.types';
import { Banner } from '../../../types/banner.types';
import { Meta } from '../../../types/meta.types';

export interface UpdateProfileResponse {
  data: ProfileData;
  meta: Meta;
}

export interface ProfileData {
  avatar: Avatar;
  banner: Banner;
  bio: string;
  email: string;
  name: string;
  venueManager: boolean;
  _count: Count;
}

export interface Count {
  venues: number;
  bookings: number;
}
