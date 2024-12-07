import { Avatar } from '../../../types/avatar.types';
import { Banner } from '../../../types/banner.types';
import { Meta } from '../../../types/meta.types';

export interface RegisterResponse {
  data: UserData;
  meta: Meta;
}

export interface UserData {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
}
