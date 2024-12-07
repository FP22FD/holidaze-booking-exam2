import StatOverviewSection from './components/StatOverviewSection';
import VenueBookingsSection from './components/VenueBookingsSection';
import { usePersistContext } from '../../store/usePersistContext';
import PageSection from '../../shared/components/PageSection';
import { useVenueManagement } from './hooks/useDashboard';
import Spinner from '../../shared/components/Spinner';
import VenueSection from './components/VenueSection';

function DashboardPage() {
  const { requireUserLevel, profileData } = usePersistContext();
  const { error, loading, stats, venuesData, loadVenues } = useVenueManagement(profileData?.name);

  requireUserLevel('manager');

  if (loading) {
    return (
      <div className="text-typography-primary-blue">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-status-error-red">{error}</div>;
  }

  if (!stats) {
    return;
  }

  return (
    <PageSection
      title="Dashboard"
      seoTitle="Manager Dashboard | Holidaze Booking"
      seoDescription="Manage your venues and bookings made from your customer"
      searchBar={false}
    >
      <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-16">
        <div className="w-full flex flex-col gap-8 rounded-lg">
          <StatOverviewSection stats={stats} />
          <VenueSection venues={venuesData ?? []} onRefresh={() => loadVenues()} />
          <VenueBookingsSection venues={venuesData ?? []} />
        </div>
      </div>
    </PageSection>
  );
}

export default DashboardPage;
