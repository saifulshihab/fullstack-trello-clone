import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  modalOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const modalStyles = {
  overlay: {
    backgroundColor: 'rgb(0 0 0 / 75%)',
  },
  content: {
    top: '50px',
    left: '20%',
    right: '20%',
    bottom: '50px',
    backgroundColor: '#f4f5f7',
    padding: '10px',
  },
};

const Modal = ({ modalOpen, closeModal, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      contentLabel="Card Modal"
      style={modalStyles}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
