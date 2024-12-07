import { Modal } from './Modal';

interface Props {
  onClose?: () => void;
  title?: string;
  message: string;
  icon?: React.ReactNode;
}

export const ModalMessage = ({ onClose, title, message, icon }: Props) => {
  const body = (
    <>
      {icon && <div>{icon}</div>}
      <p>{message}</p>
    </>
  );

  return <Modal onClose={onClose} title={title} body={body} />;
};
