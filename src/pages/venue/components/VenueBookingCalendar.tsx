import { useState } from 'react';
import { Calendar, CalendarSelected } from '@demark-pro/react-booking-calendar';
import { Venue } from '../hooks/fetchVenue';
import { usePersistContext } from '../../../store/usePersistContext';
import { getReservedDate, hasReservedDates, oneDay } from './calendarUtils';
import BookingSummary from './BookingSummary';

interface VenueBookingCalendarProps {
  venue: Venue;
}

function VenueBookingCalendar({ venue }: VenueBookingCalendarProps) {
  const { userType, isLoggedIn } = usePersistContext();
  const [selectedDates, setSelectedDates] = useState<CalendarSelected[]>([]);
  const [numGuests, setNumGuests] = useState<number>(1);

  const subtotal = venue.price * (numGuests || 1);
  let from: Date | undefined = undefined;
  let to: Date | undefined = undefined;
  let numberNights = 0;

  if (selectedDates.length === 2) {
    from = selectedDates[0] as Date;
    to = selectedDates[1] as Date;

    numberNights = Math.round((to.getTime() - from.getTime()) / oneDay);
  }

  const total = subtotal * numberNights;

  const activeBookings = venue.bookings.filter((booking) => new Date(booking.dateTo) >= new Date());
  const reservedDates = getReservedDate(activeBookings, numGuests, venue.maxGuests).filter(
    (date) => date >= new Date(),
  );

  const reserved = reservedDates.map((date) => {
    return {
      startDate: date,
      endDate: date,
    };
  });

  const canBook = from && to && numGuests > 0 && !hasReservedDates(from, to, reservedDates) ? true : false;

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setNumGuests(1);
      return;
    } else {
      setNumGuests(parseInt(e.target.value, 10));
    }
  };

  return (
    <>
      <div className="w-full md:max-w-md bg-white">
        <div className="w-full md:max-w-md p-6 shadow-md rounded-lg space-y-6 mb-8 relative">
          <h2 className="text-heading-4 font-bold text-center mb-6 text-primary-dark-blue">Booking</h2>
          <div className="bg-neutral-white">
            <Calendar
              selected={selectedDates}
              reserved={reserved}
              range={true}
              protection={true}
              options={{ locale: 'en', weekStartsOn: 1, useAttributes: true }}
              onChange={setSelectedDates}
            />
          </div>

          <div>
            <label htmlFor="guests" className="block text-typography-primary-blue font-semibold">
              No. of Guests
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              value={numGuests}
              max={venue.maxGuests}
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
              onChange={handleGuestChange}
            />
          </div>

          <div className="text-center my-4 flex flex-col pb-4">
            <p className="text-body-large text-typography-primary-grey font-medium mb-4">Subtotal</p>
            <p className="text-accent-pink font-extrabold text-4xl">$ {subtotal}</p>
          </div>
        </div>

        {canBook && (
          <BookingSummary
            isLoggedIn={isLoggedIn}
            from={from}
            to={to}
            numGuests={numGuests}
            numberNights={numberNights}
            total={total}
            userType={userType}
            canBook={canBook}
            venue={venue}
          />
        )}
      </div>
    </>
  );
}

export default VenueBookingCalendar;
