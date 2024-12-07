import { useParams } from 'react-router-dom';
import { useState } from 'react';
import PageSection from '../../shared/components/PageSection';
import StarRating from '../../shared/components/StarRating';
import { useFetchVenue } from './hooks/fetchVenue';
import { Facility } from './components/Facility';
import VenueBookingCalendar from './components/VenueBookingCalendar';
import Spinner from '../../shared/components/Spinner';
import {
  PiCarLight,
  PiCoffeeLight,
  PiImageDuotone,
  PiMapPinFill,
  PiPawPrintLight,
  PiWifiHighLight,
} from 'react-icons/pi';

function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: venue, error } = useFetchVenue(id || '');
  const [imageError, setImageError] = useState<boolean>(false);

  if (!venue) {
    return <Spinner />;
  }

  const { media, location, name, description, rating, maxGuests, meta } = venue;
  const imageUrl = media?.length ? media[0].url : '';
  const altText = media?.length ? media[0].alt : 'Venue Image';
  const locationCountry = location?.country || 'unavailable';
  const reviews = 0;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <PageSection
      title="Venue Details"
      seoTitle={`Venue ${venue.name} | Holidaze Booking`}
      seoDescription={`Book the holiday of your dreams at ${venue.name} !`}
      searchBar={false}
      error={error}
    >
      <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-16 mt-2">
        <div className="w-full md:w-2/3 md:mb-0 shadow-md rounded-lg mb-8 h-fit">
          {imageError || !imageUrl ? (
            <PiImageDuotone className="w-full h-64 object-cover text-neutral-default" />
          ) : (
            <img
              className="w-full object-cover h-64 sm:h-80 lg:h-96"
              src={imageUrl}
              alt={altText || 'Product image'}
              onError={handleImageError}
            />
          )}

          <div className="px-2 text-primary-dark-blue">
            <h2 className="text-heading-4 font-semibold text-typography-primary-blue">{name}</h2>
            <div className="flex items-center space-x-3 text-body-small text-typography-primary-grey">
              <div className="flex items-center">
                <PiMapPinFill className="mr-2" />
                <span>{locationCountry}</span>
              </div>

              <div className="border-l border-neutral-dark h-4"></div>

              <StarRating rating={rating || 0} />

              <div className="border-l border-neutral-dark h-4"></div>

              <div className="flex items-start space-x-1">
                <span>{reviews > 0 ? reviews : '0 reviews'}</span>
              </div>
            </div>

            <p className="my-4">{description}</p>
            {maxGuests && (
              <div className="flex items-center space-x-2 rounded text-body-medium">
                <span className="font-medium">Max Guests</span>
                <span className="pl-1">{maxGuests}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap px-2 gap-4 mt-6 pb-6 text-typography-primary-grey">
            {meta?.wifi && <Facility icon={<PiWifiHighLight />} label="Free Wifi" />}
            {meta?.parking && <Facility icon={<PiCarLight />} label="Free Parking" />}
            {meta?.pets && <Facility icon={<PiPawPrintLight />} label="Pets Allowed" />}
            {meta?.breakfast && <Facility icon={<PiCoffeeLight />} label="Breakfast" />}
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <VenueBookingCalendar venue={venue} />
        </div>
      </div>
    </PageSection>
  );
}

export default VenueDetailPage;
