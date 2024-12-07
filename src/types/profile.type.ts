import { Avatar } from './avatar.types';
import { Banner } from './banner.types';
import { Meta } from './meta.types';

export interface ProfileResponse {
  data: ProfileData;
  meta: Meta;
}

export interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
}
