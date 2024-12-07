import { PiArrowClockwise } from 'react-icons/pi';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <PiArrowClockwise className="animate-spin text-primary-dark h-16 w-16" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-typography-primary-grey text-lead-paragraph">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
