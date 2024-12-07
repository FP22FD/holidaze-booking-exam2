import { Booking } from '../hooks/fetchVenue';

export const oneDay = 1000 * 60 * 60 * 24;

export function getReservedDate(bookings: Booking[], numGuestRequired: number, maxGuests: number): Date[] {
  const dates = new Map<number, number>();

  for (const booking of bookings) {
    const from = new Date(booking.dateFrom);
    from.setHours(0, 0, 0, 0);

    const to = new Date(booking.dateTo);
    to.setHours(0, 0, 0, 0);

    let date = new Date(from);

    while (date <= to) {
      const dateAsMs = date.getTime();

      if (dates.has(dateAsMs)) {
        const prev = dates.get(dateAsMs) as number;
        dates.set(dateAsMs, prev + booking.guests);
      } else {
        dates.set(dateAsMs, booking.guests);
      }

      date = new Date(dateAsMs + oneDay);
    }
  }

  let result = Array.from(dates.entries())
    .filter(([, guests]) => guests + numGuestRequired > maxGuests)
    .map(([dateAsMs]) => new Date(dateAsMs));

  result = distinctDates(result);
  result = result.sort((a, b) => a.getTime() - b.getTime());

  return result;
}

export function hasReservedDates(from: Date, to: Date, reservedDates: Date[]) {
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);

  let date = new Date(from);

  while (date <= to) {
    if (reservedDates.find((d) => isSameDate(d, date))) {
      return true;
    }

    date = new Date(date.getTime() + oneDay);
  }
}

export function distinctDates(datesArray: Date[]): Date[] {
  return datesArray.filter((date, i, self) => self.findIndex((d) => isSameDate(d, date)) === i);
}

function isSameDate(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}
