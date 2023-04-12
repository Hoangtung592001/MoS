import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './BoostrapModal.scss'
type BoostrapModalProps = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    isErrored?: boolean,
    title: string,
    content: string
}

function BoostrapModal({ show, setShow, isErrored = false, title, content } : BoostrapModalProps) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} className='modal-custom-padding'>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className='modal-header__text'>
                {title}
            </span>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span className='modal-body__text'>
                {content}
            </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={isErrored ? 'danger' : 'secondary'} onClick={handleClose}>
            <span className='modal-button__text'>
                Close
            </span>
          </Button>
          {
            !isErrored &&
            <Button variant="primary" onClick={handleClose}>
                <span className='modal-button__text'>
                    Save Changes
                </span>
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BoostrapModal;
