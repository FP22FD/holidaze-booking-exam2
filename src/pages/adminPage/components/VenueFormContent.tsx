import { FieldErrors, UseFormRegister } from 'react-hook-form';
import CheckboxField from './CheckboxField';
import { EditVenueForm } from './VenueForm';

interface VenueFormContentPros {
  errors: FieldErrors<EditVenueForm>;
  register: UseFormRegister<EditVenueForm>;
}

export const VenueFormContent = ({ errors, register }: VenueFormContentPros) => (
  <>
    <div className="place-self-start w-full text-body-small md:text-body-medium text-typography-primary-blue space-y-4 md:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 text-start gap-2 md:gap-4 ">
        <div className="w-full">
          <label htmlFor="name" id="name" className="block">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Enter venue name"
            aria-labelledby="name"
            className="w-full border rounded-md text-typography-primary-grey focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue py-2 px-1"
          />

          {errors.name && <div className="text-status-error-red">{errors.name.message}</div>}
        </div>

        <div className="w-full">
          <label htmlFor="rating" id="rating" className="block">
            Rating
          </label>
          <input
            id="rating"
            type="number"
            {...register('rating')}
            placeholder="Enter rating number"
            aria-labelledby="rating"
            className="w-full border rounded-md text-typography-primary-grey focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue py-2 px-1"
          />

          {errors.rating && <div className="text-status-error-red">{errors.rating.message}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 text-start gap-2 md:gap-4">
        <div className="w-full">
          <label htmlFor="imageUrl" id="imageUrl" className="block">
            Image url
          </label>
          <input
            id="imageUrl"
            type="url"
            {...register('imageUrl')}
            placeholder="Enter image url"
            aria-labelledby="imageUrl"
            className="w-full border rounded-md text-typography-primary-grey focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue py-2 px-1"
          />
          {errors.imageUrl && <div className="text-status-error-red">{errors.imageUrl.message}</div>}
        </div>

        <div className="w-full">
          <label htmlFor="imageAlt" id="imageAlt" className="block">
            Image Alt
          </label>
          <input
            id="imageAlt"
            type="text"
            {...register('imageAlt')}
            placeholder="Enter image name"
            aria-labelledby="imageAlt"
            className="w-full border rounded-md text-typography-primary-grey focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue py-2 px-1"
          />
          {errors.imageAlt && <div className="text-status-error-red">{errors.imageAlt.message}</div>}
        </div>
      </div>

      <div className="grid grid-cols-2 text-start gap-2 md:gap-4">
        <div className="w-full">
          <label htmlFor="price" id="price" className="block">
            Price
          </label>
          <input
            id="price"
            type="number"
            {...register('price')}
            placeholder="Enter venue price"
            aria-labelledby="price"
            className="w-full border rounded-md text-typography-primary-grey focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue py-2 px-1"
          />
          {errors.price && <div className="text-status-error-red">{errors.price.message}</div>}
        </div>

        <div className="w-full">
          <label htmlFor="maxGuests" id="maxGuests" className="block">
            MaxGuests
          </label>
          <input
            id="maxGuests"
            type="number"
            {...register('maxGuests')}
            placeholder="Enter max maxGuests"
            aria-labelledby="maxGuests"
            className="w-full border rounded-md text-typography-primary-grey focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue py-2 px-1"
          />
          {errors.maxGuests && <div className="text-status-error-red">{errors.maxGuests.message}</div>}
        </div>
      </div>

      <div className="grid grid-cols-2 text-start border rounded-md py-2 px-1">
        <CheckboxField label="Wifi" id="wifi" register={register} />
        <CheckboxField label="Parking" id="parking" register={register} />
        <CheckboxField label="Breakfast" id="breakfast" register={register} />
        <CheckboxField label="Pets" id="pets" register={register} />
      </div>

      <div>
        <label htmlFor="description" id="description" className="block text-start">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          placeholder="Enter description"
          aria-labelledby="description"
          className="w-full border rounded-md text-typography-primary-grey focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue p-1 md:p-2"
        ></textarea>

        {errors.description && <div className="text-status-error-red text-start">{errors.description.message}</div>}
      </div>
    </div>
  </>
);

export default VenueFormContent;
