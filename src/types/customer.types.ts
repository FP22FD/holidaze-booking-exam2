import { Avatar } from './avatar.types';
import { Banner } from './banner.types';

export interface Customer {
  name: string;
  email: string;
  bio?: string;
  avatar: Avatar;
  banner: Banner;
}
