import { PiXCircleLight } from 'react-icons/pi';

interface ModalProps {
  onClose?: () => void;
  title?: string;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({ onClose, title, body, footer }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-typography-primary-grey bg-opacity-50 flex justify-center items-center z-50 p-6"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-modal="true"
    >
      <div className="bg-neutral-white rounded-lg shadow-custom text-end w-full m-4 p-2 sm:p-6 max-w-2xl">
        {onClose && (
          <button onClick={onClose} aria-label="Close modal">
            <PiXCircleLight className="w-8 h-8 text-typography-primary-grey" />
          </button>
        )}
        {title && (
          <div className="flex justify-between items-center">
            <h2 id="modal-title" className="font-semibold text-heading-6 sm:text-heading-4">
              {title}
            </h2>
          </div>
        )}
        <div className="flex flex-col items-center text-center">{body}</div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
};
