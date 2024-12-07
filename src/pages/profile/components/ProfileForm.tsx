import { PiCheckCircleFill, PiXLight } from 'react-icons/pi';
import Button from '../../../shared/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePersistContext } from '../../../store/usePersistContext';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { useState } from 'react';
import { ModalMessage } from '../../../shared/components/ModalMessage';
import { validateUrl } from '../../../shared/utils/validationURL';
import { ProfileData } from '../../../types/profile.type';

interface ProfileFormProps {
  profile: ProfileData;
  onClose: () => void;
}

interface EditProfileForm {
  avatarUrl: string;
  avatarAlt: string;
  bio: string;
}

const validationSchema = Yup.object({
  avatarUrl: Yup.string()
    .trim()
    .url('Please enter a valid URL for your avatar')
    .required('Please enter your avatar url')
    .max(300, 'URL must be at most 200 characters')
    .test('check-url', 'The URL is not valid or accessible.', validateUrl),
  avatarAlt: Yup.string()
    .trim()
    .required('Please enter the image description')
    .min(4, 'Image description must be at least 4 characters')
    .max(120, 'Image description must be at most 120 characters'),
  bio: Yup.string()
    .trim()
    .required('Please enter your bio')
    .min(8, 'Bio must be at least 8 characters')
    .max(160, 'Bio must be at most 200 characters'),
}).required();

const ProfileForm = ({ profile, onClose }: ProfileFormProps) => {
  const { profileData, setProfileData } = usePersistContext();
  const { loading, updateProfile } = useUpdateProfile();
  const [formError, setFormError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      avatarUrl: profile.avatar.url,
      avatarAlt: profile.avatar.alt,
      bio: profile.bio,
    },
  });

  const onSubmit: SubmitHandler<EditProfileForm> = async (data, e) => {
    e?.preventDefault();

    if (!profileData) return;

    const newProfile = { ...profileData };
    newProfile.avatar = { url: data.avatarUrl, alt: data.avatarAlt };
    newProfile.bio = data.bio;

    const { success, data: updatedProfileData } = await updateProfile(newProfile);

    if (!success) {
      setFormError('Failed to update profile. Please try again later.');
      return;
    }

    if (success && updatedProfileData) {
      setProfileData(updatedProfileData);
      setIsSuccess(true);
    }
  };

  return (
    <>
      {isSuccess && (
        <ModalMessage
          onClose={onClose}
          message="You have successfully updated your profile!"
          icon={<PiCheckCircleFill className="w-16 h-16 text-primary-dark-blue" />}
        />
      )}

      <form className="p-4 bg-neutral-white border my-2 rounded-lg" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6 flex justify-end">
          <button
            aria-label="Close menu"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="focus:outline-none bg-pink-gradient rounded p-1"
          >
            <PiXLight className="w-6 h-6 text-typography-primary-white" aria-hidden="true" />
          </button>
        </div>

        {formError && <div className="text-status-error-red text-center my-4">{formError}</div>}

        <div className="place-self-start w-full space-y-4 md:space-y-6 lg:space-y-8 text-body-medium sm:text-body-large">
          <div>
            <label htmlFor="avatarUrl" id="avatarUrl" className="block text-typography-primary-blue">
              Your profile image
            </label>
            <input
              id="avatarUrl"
              type="url"
              {...register('avatarUrl')}
              placeholder="Enter the image url"
              aria-labelledby="avatarUrl"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            />
            {errors.avatarUrl && <div className="text-status-error-red">{errors.avatarUrl.message}</div>}
          </div>

          <div>
            <label htmlFor="avatarAlt" id="avatarAlt" className="block text-typography-primary-blue">
              Your image name
            </label>
            <input
              id="avatarAlt"
              type="text"
              {...register('avatarAlt')}
              placeholder="Enter your image name"
              aria-labelledby="avatarAlt"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            />
            {errors.avatarAlt && <div className="text-status-error-red">{errors.avatarAlt.message}</div>}
          </div>

          <div>
            <label htmlFor="bio" id="bio" className="block text-typography-primary-blue">
              Your bio
            </label>
            <textarea
              id="bio"
              {...register('bio')}
              placeholder="Enter your bio"
              aria-labelledby="bio"
              className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            ></textarea>

            {errors.bio && <div className="text-status-error-red">{errors.bio.message}</div>}
          </div>

          <div className="flex space-x-8 place-self-center">
            <Button
              type="submit"
              label="Update"
              ariaLabel="Update"
              size="medium"
              variant="primary"
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;
