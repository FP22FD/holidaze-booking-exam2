import Button from '../../../shared/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { useUpdateVenue } from '../hooks/useUpdateVenue';
import { ModalMessage } from '../../../shared/components/ModalMessage';
import { PiCheckCircleFill } from 'react-icons/pi';
import { EditVenueRequest, useCreateVenue } from '../hooks/useCreateVenue';
import { Venue } from '../../../types/venue.type';
import VenueFormContent from './VenueFormContent';
import { validateUrl } from '../../../shared/utils/validationURL';

interface Props {
  editMode: 'edit' | 'create';
  venue: Venue;
  onClose: () => void;
}

export interface EditVenueForm {
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  price: number;
  maxGuests: number;
  rating: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Please enter the venue name').min(3, 'Venue name must be at least 3 characters'),
  rating: Yup.number()
    .required('Please enter the venue rating')
    .typeError('Rating must be a number')
    .integer('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  imageUrl: Yup.string()
    .trim()
    .url('Please enter a valid URL for your venue image')
    .required('Please enter the venue image url')
    .test('check-url', 'The URL is not valid or accessible.', validateUrl),
  imageAlt: Yup.string()
    .trim()
    .required('Please enter the image description')
    .min(4, 'Image description must be at least 4 characters'),
  price: Yup.number()
    .required('Please enter the venue price')
    .typeError('Price must be a number')
    .min(1, 'Price must be at least 1')
    .max(10000, 'Price must be at most 10000'),
  maxGuests: Yup.number()
    .required('Please enter the max maxGuests')
    .typeError('MaxGuests must be a number')
    .integer('MaxGuests must be a whole number')
    .min(1, 'maxGuests must be at least 1')
    .max(100, 'MaxGuests must be at most 100'),
  description: Yup.string()
    .trim()
    .required('Please enter venue description')
    .min(8, 'Description must be at least 8 characters')
    .max(246, 'Description must be at most 246 characters'),
  wifi: Yup.boolean().required(),
  parking: Yup.boolean().required(),
  breakfast: Yup.boolean().required(),
  pets: Yup.boolean().required(),
}).required();

const VenueForm = ({ editMode, venue, onClose }: Props) => {
  const { loading: loadingCreate, error: errorCreate, createVenue } = useCreateVenue();
  const { loading: loadingUpdate, error: errorUpdate, updateVenue } = useUpdateVenue();
  const [formError, setFormError] = useState<string>('');
  const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false);
  const [isEditSuccess, setIsEditSuccess] = useState<boolean>(false);

  const loading = loadingCreate || loadingUpdate;
  const error = errorCreate || errorUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: venue.name,
      rating: venue.rating,
      imageUrl: venue.media[0]?.url || '',
      imageAlt: venue.media[0]?.alt || '',
      price: venue.price,
      maxGuests: venue.maxGuests,
      description: venue.description,
      wifi: venue.meta.wifi,
      parking: venue.meta.parking,
      breakfast: venue.meta.breakfast,
      pets: venue.meta.pets,
    },
  });

  const onSubmit: SubmitHandler<EditVenueForm> = async (data, e) => {
    e?.preventDefault();
    setFormError('');

    const request: EditVenueRequest = {
      name: data.name,
      description: data.description,
      media: [{ url: data.imageUrl, alt: data.imageAlt }],
      price: data.price,
      maxGuests: data.maxGuests,
      rating: data.rating,
      location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        lat: undefined,
        lng: undefined,
      },
      meta: {
        wifi: data.wifi,
        parking: data.parking,
        breakfast: data.breakfast,
        pets: data.pets,
      },
    };

    if (editMode === 'create') {
      const { success } = await createVenue(request);
      if (success) {
        setIsCreateSuccess(true);
      } else {
        setFormError('Failed to create venue. Please try again later.');
      }
    } else if (editMode === 'edit' && venue) {
      const { success } = await updateVenue(venue.id, request);
      if (success) {
        setIsEditSuccess(true);
      } else {
        setFormError('Failed to update venue. Please try again later.');
      }
    }
  };

  return (
    <>
      {error && <div className="text-status-error-red text-center my-4">{error}</div>}

      {isEditSuccess && (
        <ModalMessage
          onClose={onClose}
          message="You have successfully updated your venue!"
          icon={<PiCheckCircleFill className="w-16 h-16 text-primary-dark-blue" />}
        />
      )}

      {isCreateSuccess && (
        <ModalMessage
          onClose={onClose}
          message="You have successfully created a new venue!"
          icon={<PiCheckCircleFill className="w-16 h-16 text-primary-dark-blue" />}
        />
      )}

      <form
        className="bg-neutral-white lg:border w-full rounded-lg p-2 md:p-4 lg:mt-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {formError && <div className="text-status-error-red text-center my-4">{formError}</div>}

        <VenueFormContent errors={errors} register={register} />

        <div className="flex mt-4 md:mt-6 place-self-center">
          {editMode === 'create' && (
            <Button
              type="submit"
              label="Create Venue"
              ariaLabel="Create Venue"
              size="medium"
              variant="primary"
              disabled={loading}
            />
          )}

          {editMode === 'edit' && (
            <Button
              type="submit"
              label="Edit Venue"
              ariaLabel="Edit Venue"
              size="medium"
              variant="primary"
              disabled={loading}
            />
          )}
        </div>
      </form>
    </>
  );
};

export default VenueForm;
