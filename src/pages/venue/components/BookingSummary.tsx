import Button from '../../../shared/components/Button';
import { Modal } from '../../../shared/components/Modal';
import { useState } from 'react';
import { useCreateBooking } from '../hooks/useBookingUser';
import Spinner from '../../../shared/components/Spinner';
import { Venue } from '../hooks/fetchVenue';
import { Link } from 'react-router-dom';
import { PiCheckCircleFill } from 'react-icons/pi';

interface BookingSummaryProps {
  isLoggedIn: boolean;
  from: Date | undefined;
  to: Date | undefined;
  numGuests: number;
  numberNights: number;
  total: number;
  userType: string;
  canBook: boolean;
  venue: Venue;
}

function BookingSummary({ isLoggedIn, numGuests, numberNights, total, venue, from, to, canBook }: BookingSummaryProps) {
  const { createBooking, loading, error } = useCreateBooking();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleBooking = async () => {
    if (!isLoggedIn) {
      return;
    }

    if (!from || !to || numGuests <= 0) {
      setBookingError('Choose a date range and guests to proceed');
      return;
    }

    const bookingDataRequest = {
      dateFrom: from.toISOString(),
      dateTo: to.toISOString(),
      guests: numGuests,
      venueId: venue.id,
    };

    const response = await createBooking(bookingDataRequest);

    if (response.success) {
      setIsSuccess(true);
    } else {
      setBookingError('Could not create the booking!');
    }
  };

  return (
    <>
      {isSuccess && (
        <Modal
          onClose={() => setIsSuccess(false)}
          body={
            <div className="text-primary-dark-blue font-bold flex flex-col place-items-center text-center mb-8">
              <PiCheckCircleFill className="w-16 h-16 text-primary-dark-blue mb-6" />
              Thank you for booking <span className="text-primary-dark-blue">{venue.name}!</span>
            </div>
          }
          footer={
            <div className="flex justify-center text-typography-primary-grey text-body-small sm:text-body-medium">
              <div className="flex justify-center gap-4 md:gap-8 py-4 sm:py-6 mt text-nowrap">
                <Link to={'/'}>
                  <p className="hover:text-primary-dark-blue font-semibold">Explore more venues</p>
                </Link>
                <div className="border-l border-typography-primary-grey h-6"></div>
                <Link to={'/profile'}>
                  <p className="hover:text-primary-dark-blue font-semibold">Go to my profile</p>
                </Link>
              </div>
            </div>
          }
        />
      )}

      <div className="max-w-md p-6 shadow-md rounded-lg text-typography-primary-grey">
        {loading && <Spinner />}
        {bookingError && (
          <p className="text-status-error-red text-body-medium font-semibold text-center">{bookingError}</p>
        )}
        {error && <p className="text-status-error-red text-body-medium text-center">{error} Try again!</p>}

        <h3 className="text-heading-4 font-bold text-center mb-6 text-primary-dark-blue">Request to book</h3>
        <div className="flex justify-between">
          <p>Nights</p>
          <p>{numberNights}</p>
        </div>
        <div className="flex justify-between">
          <p>Guests</p>
          <p>{numGuests}</p>
        </div>
        <div className="border-t border-neutral-default mb-6"></div>
        <div className="flex justify-between mb-6">
          <p>Total</p>
          <p>$ {total}</p>
        </div>

        {!isLoggedIn && (
          <div className="flex w-full space-x-6 place-content-center text-body-medium text-status-error-red mb-6">
            <p>Sign in to book your stay</p>
            <Link to={'/auth/login'}>
              <p className=" font-semibold">Login</p>
            </Link>
          </div>
        )}

        {isLoggedIn && !canBook && (
          <div className="space-y-4">
            <div className="w-full place-self-center">
              <Button
                label="Confirm Booking"
                type="button"
                ariaLabel="Check availability"
                variant="secondary"
                size="large"
                fullWidth={true}
                disabled={true}
                onClick={handleBooking}
              />
            </div>
          </div>
        )}

        {isLoggedIn && canBook && (
          <div className="w-full place-self-center">
            <Button
              label="Confirm Booking"
              type="button"
              ariaLabel="Confirm booking"
              variant="primary"
              size="large"
              fullWidth={true}
              onClick={handleBooking}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default BookingSummary;
