import { useState } from 'react';
import { PiImageDuotone } from 'react-icons/pi';
import { Booking } from '../../../types/booking.types';

interface Props {
  upcomingBookings: Booking[];
}

const UpcomingBookings = ({ upcomingBookings }: Props) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!upcomingBookings) {
    return null;
  }

  const getImageUrl = (booking: Booking) => (booking.venue.media?.length ? booking.venue.media[0].url : '');
  const getAltText = (booking: Booking) => (booking.venue.media?.length ? booking.venue.media[0].alt : 'Venue Image');

  return (
    <div className="p-2">
      <h2 className="text-primary-dark-blue text-heading-6 mb-6">Upcoming Bookings</h2>

      {upcomingBookings.length === 0 && (
        <p className="text-typography-primary-grey text-sm text-center pt-6">
          You don't have any upcoming bookings yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingBookings.map((booking: Booking) => (
          <div key={booking.id} className="bg-neutral-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="object-cover rounded overflow-hidden">
                {imageError || !getImageUrl(booking) ? (
                  <PiImageDuotone className="w-full h-48 object-cover text-neutral-default" />
                ) : (
                  <img
                    className="object-cover h-48 rounded"
                    width={500}
                    src={getImageUrl(booking)}
                    alt={getAltText(booking)}
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 text-primary-dark-blue text-body-medium">
              <h4 className="mb-4 font-bold text-typography-primary-blue">{booking.venue.name}</h4>

              <div className="flex justify-between">
                <p className="text-primary-dark font-semibold">Guests</p>
                <p className="text-typography-primary-grey">{booking.guests}</p>
              </div>

              <div className="border-t border-neutral-default my-2"></div>

              <div className="flex justify-between">
                <div className="text-start">
                  <p className="text-primary-dark font-semibold">From</p>
                  <p className="text-typography-primary-grey">{new Date(booking.dateFrom).toLocaleDateString()}</p>
                </div>
                <div className="text-end">
                  <p className="text-primary-dark font-semibold">To</p>
                  <p className="text-typography-primary-grey">{new Date(booking.dateTo).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
