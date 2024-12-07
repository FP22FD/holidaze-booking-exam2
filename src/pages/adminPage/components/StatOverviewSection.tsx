import { AdminVenuesStats } from '../hooks/useDashboard';

interface Props {
  stats: AdminVenuesStats;
}

const StatOverviewSection = ({ stats }: Props) => {
  return (
    <div className="flex justify-between gap-8">
      <div className="border rounded-lg p-8 my-2 text-center w-full">
        <p className="font-semibold text-typography-primary-grey">Venues</p>
        <span className="text-primary-dark-blue font-bold text-lead-paragraph">{stats.venues}</span>
      </div>
      <div className="border rounded-lg p-8 my-2 text-center w-full">
        <p className="font-semibold text-typography-primary-grey">Bookings</p>
        <span className="text-primary-dark-blue font-bold text-lead-paragraph">{stats.bookings}</span>
      </div>
    </div>
  );
};

export default StatOverviewSection;
