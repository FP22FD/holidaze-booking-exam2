import { UseFormRegister } from 'react-hook-form';
import { EditVenueForm } from './VenueForm';

interface Props {
  label: string;
  id: keyof EditVenueForm;
  register: UseFormRegister<EditVenueForm>;
}

const CheckboxField = ({ label, id, register }: Props) => (
  <div className="flex place-items-center gap-1 md:gap-2">
    <input
      id={id}
      type="checkbox"
      value="1"
      {...register(id)}
      aria-labelledby={id}
      className="w-3 h-3 md:w-4 md:h-4 border rounded appearance-none checked:bg-primary-dark-blue checked:border-none focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
    />
    <label htmlFor={id} className="block text-typography-primary-blue">
      {label}
    </label>
  </div>
);

export default CheckboxField;
