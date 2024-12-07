import { PiImageDuotone, PiMapPinFill, PiPlusLight } from 'react-icons/pi';
import Button from '../../../shared/components/Button';
import StarRating from '../../../shared/components/StarRating';
import { AdminVenueData } from '../types/dashboardResponse.type';
import { Venue } from '../../../types/venue.type';

interface Props {
  venues: AdminVenueData[];
  setInUpdate: (venue: Venue) => void;
  setInDelete: (venue: Venue) => void;
  handleCreateVenue: () => void;
}

const ManagerVenueCard = ({ venues, setInUpdate, setInDelete, handleCreateVenue }: Props) => (
  <>
    <div className="space-y-6 flex w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-start rounded-md p-2 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="shadow-md hover:shadow-lg transition-shadow p-2 rounded-lg flex flex-col justify-between w-full"
          >
            {venue.media.length > 0 ? (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt || 'Venue image'}
                className="w-full h-52 object-cover rounded"
              />
            ) : (
              <PiImageDuotone className="w-full h-48 object-cover text-neutral-default" />
            )}

            <h4 className="text-typography-primary-blue font-bold">{venue.name}</h4>

            <div className="flex justify-between mb-2 items-center text-typography-primary-grey">
              <div className="text-body-medium flex items-center">
                <PiMapPinFill className="mr-2" />
                {venue.location?.country || 'Location unavailable'}
              </div>
              <div className="flex flex-col items-start">{venue.rating && <StarRating rating={venue.rating} />}</div>
            </div>

            <div className=" flex-1">
              <p className="text-body-medium text-primary-dark-blue mb-4 whitespace-pre-line">{venue.description}</p>
            </div>

            <div className="mt-2 text-typography-primary-grey text-body-medium">
              <div className="flex-col justify-between mb-4">
                <div className="flex items-end space-x-4">
                  <span className="font-semibold">Price</span>
                  <span>$ {venue.price}</span>
                </div>
                <div className="flex-col items-start space-x-4">
                  <span className="font-semibold">Max Guests</span>
                  <span>{venue.maxGuests}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col items-start">
                  <p className=" font-semibold">Facilities</p>
                  <div className="flex flex-wrap justify-between gap-4">
                    {venue.meta?.pets && <span>Pets</span>}
                    {venue.meta?.breakfast && <span>Breakfast</span>}
                    {venue.meta?.wifi && <span>Free Wifi</span>}
                    {venue.meta?.parking && <span>Free Parking</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-default my-2"></div>

            <div className="flex justify-between px-4">
              <div className="text-typography-primary-grey place-items-center space-y-4 my-4">
                <Button
                  label="Edit Venue"
                  type="button"
                  ariaLabel="Edit venue"
                  variant="secondary"
                  size="small"
                  onClick={() => setInUpdate(venue)}
                />
              </div>

              <div className="text-typography-primary-grey place-items-center space-y-4 my-4">
                <Button
                  label="Delete Venue"
                  type="button"
                  ariaLabel="Edit venue"
                  variant="secondary"
                  size="small"
                  onClick={() => setInDelete(venue)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="shadow-custom hover:shadow-md transition-shadow p-2 rounded-lg border-2 border-dashed flex items-center justify-center min-w-48 lg:min-w-72">
          <div className="text-typography-primary-grey text-center place-items-center space-y-4 my-4">
            <button aria-label="Create Venue" onClick={handleCreateVenue}>
              <PiPlusLight className="text-typography-primary-white bg-pink-gradient rounded w-8 h-8" />
            </button>
            <p>Create Venue</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default ManagerVenueCard;
