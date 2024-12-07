import { Meta } from './meta.types';
import { Venue } from './venue.type';

export interface AllVenuesResponse {
  data: Venue[];
  meta: Meta;
}
