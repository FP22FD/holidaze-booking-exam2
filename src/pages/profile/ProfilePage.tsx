import { useState } from 'react';
import Button from '../../shared/components/Button';
import Spinner from '../../shared/components/Spinner';
import UpcomingBookings from './components/UpcomingBookings';
import PageSection from '../../shared/components/PageSection';
import { useDataProfile } from './hooks/useDataProfile';
import { useUpdateProfile } from './hooks/useUpdateProfile';
import { usePersistContext } from '../../store/usePersistContext';
import ProfileForm from './components/ProfileForm';

function ProfilePage() {
  const { userType, profileData, requireUserLevel } = usePersistContext();
  const { loading, error } = useUpdateProfile();
  const { loading: getLoading, error: getError, upcomingBookings, profileCount } = useDataProfile(profileData?.name);

  const [isEditing, setIsEditing] = useState(false);

  requireUserLevel('customer');

  if (!profileData) {
    return;
  }

  if (getLoading) {
    return (
      <div className="text-typography-primary-blue">
        <Spinner />
      </div>
    );
  }

  if (getError) {
    return <div className="text-status-error-red">{getError}</div>;
  }

  const { name, avatar, bio, email } = profileData;

  return (
    <PageSection
      title="Your profile"
      seoTitle="Your profile | Holidaze Booking"
      seoDescription="Your profile information and booking history"
      searchBar={false}
    >
      {loading && (
        <div className="text-typography-primary-blue">
          <Spinner />
        </div>
      )}
      {error && <div className="text-status-error-red">{error}</div>}

      <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-16 rounded-lg py-2">
        <div className="w-full md:w-1/3 flex flex-col h-fit">
          <div className="p-2 bg-white border mb-2 rounded-lg">
            <div className="avatar-section mb-6 ">
              <div className="flex items-center space-x-2">
                <div className="w-24 h-24">
                  <img src={avatar?.url} alt="Profile Avatar" className="w-full h-full object-cover rounded" />
                </div>

                <div className="flex flex-col">
                  <p className="font-semibold text-primary-dark-blue">{name}</p>

                  <div className=" text-typography-primary-grey text-body-small md:text-body-normal">
                    <p>{email}</p>

                    <div className="flex justify-between space-x-4">
                      <p className="flex gap-2 border rounded px-2 my-2">
                        Bookings
                        <span>{profileCount?.bookings}</span>
                      </p>
                      {userType === 'manager' && (
                        <p className="flex gap-2 border rounded px-2 my-2">
                          Venues
                          <span>{profileCount?.venues}</span>
                        </p>
                      )}
                    </div>
                    <p>{userType}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-primary-dark-blue mb-6 text-body-medium">
              {bio || 'Update your profile to add a bio.'}
            </div>

            <div className="place-self-end">
              {!isEditing && (
                <div>
                  <Button
                    type="button"
                    label="Edit profile"
                    ariaLabel="Edit profile"
                    size="medium"
                    variant="secondary"
                    onClick={() => setIsEditing(true)}
                  />
                </div>
              )}
            </div>
          </div>

          {isEditing && <ProfileForm profile={profileData} onClose={() => setIsEditing(false)} />}
        </div>
        <div className="w-full md:w-2/3 border rounded-lg p-2">
          <UpcomingBookings upcomingBookings={upcomingBookings ?? []} />
        </div>
      </div>
    </PageSection>
  );
}

export default ProfilePage;
