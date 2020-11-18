import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'

import './Styles.scss';

const Modal = ({className, zIndex = 200, heading, contents}) => {

  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className={[className, 'modal'].filter(Boolean).join(' ')}>
      <FontAwesomeIcon icon={faInfoCircle} className="modal--icon" onClick={ openModal } />
      { showModal &&
        <>
          <div className="modal--background" style={{ zIndex: zIndex }} onClick={ closeModal }></div>
          <div className="modal--card" style={{ zIndex: zIndex + 1 }}>
            <FontAwesomeIcon icon={faTimes} className="modal--closeBtn" onClick={ closeModal } />
            { heading && <div className="modal--heading">{heading}</div> }
            { contents && <div className="modal--contents">{contents}</div> }
          </div>
        </>
      }
    </div>
  )
}

export default Modal;
