import Button from '../../../shared/components/Button';
import { AdminVenueData } from '../types/dashboardResponse.type';
import { useState } from 'react';
import { Modal } from '../../../shared/components/Modal';
import VenueForm from './VenueForm';
import { Venue } from '../../../types/venue.type';
import Spinner from '../../../shared/components/Spinner';
import { useDeleteVenue } from '../hooks/useDeleteVenue';
import DashboardVenueCard from './ManagerVenueCard';

interface Props {
  venues: AdminVenueData[];
  onRefresh: () => void;
}

const VenueSection = ({ venues, onRefresh }: Props) => {
  const { loading: loadingDelete, error: errorDelete, deleteVenue } = useDeleteVenue();

  const [inUpdate, setInUpdate] = useState<Venue | undefined>(undefined);
  const [inDelete, setInDelete] = useState<Venue | undefined>(undefined);
  const [inCreate, setInCreate] = useState<Venue | undefined>(undefined);

  const handleCreateVenue = () => {
    setInCreate({
      id: '',
      created: '',
      updated: '',
      name: '',
      description: '',
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      location: { country: '' },
      meta: { pets: false, breakfast: false, wifi: false, parking: false },
      _count: { bookings: 0 },
    });
  };

  return (
    <>
      {inCreate && (
        <Modal
          onClose={() => setInCreate(undefined)}
          title="Create Venue"
          body={
            <VenueForm
              editMode="create"
              venue={inCreate}
              onClose={() => {
                setInCreate(undefined);
                onRefresh();
              }}
            />
          }
        />
      )}

      {inUpdate && (
        <Modal
          onClose={() => setInUpdate(undefined)}
          title="Edit Venue"
          body={
            <VenueForm
              editMode="edit"
              venue={inUpdate}
              onClose={() => {
                setInUpdate(undefined);
                onRefresh();
              }}
            />
          }
        />
      )}

      {inDelete && (
        <Modal
          body={
            <>
              Are you sure you want to delete the venue{' '}
              <span className="font-bold text-primary-dark-blue">{inDelete.name}</span>
            </>
          }
          footer={
            <div className="flex space-x-4 justify-center">
              {loadingDelete && <Spinner />}

              {errorDelete && <p className="text-status-error-red">{errorDelete}</p>}

              {!loadingDelete && (
                <>
                  <Button
                    label="Cancel"
                    type="button"
                    ariaLabel="cancel"
                    variant="secondary"
                    onClick={() => setInDelete(undefined)}
                  />
                  <Button
                    label="Yes, delete it"
                    type="button"
                    ariaLabel="yes, delete it"
                    variant="primary"
                    onClick={async () => {
                      const { success } = await deleteVenue(inDelete.id);
                      if (success) {
                        setInDelete(undefined);
                        onRefresh();
                      }
                    }}
                  />
                </>
              )}
            </div>
          }
        />
      )}

      <div className="my-2 py-2">
        <div className="flex justify-between p-2 place-items-center border-b mx-2">
          <p className="font-semibold">Venues</p>
          <div className="flex space-x-2 text-body-medium text-typography-primary-grey">
            <p>Venues</p>
            <span className="font-semibold">{venues.length}</span>
          </div>
        </div>

        <div className="gap-4 py-6 flex">
          <DashboardVenueCard
            venues={venues}
            setInUpdate={setInUpdate}
            setInDelete={setInDelete}
            handleCreateVenue={handleCreateVenue}
          />
        </div>
      </div>
    </>
  );
};

export default VenueSection;
