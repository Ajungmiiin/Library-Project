import { useEffect } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);
  return createPortal(
    <dialog ref={dialog} onClose={onClose} className="border p-6">
      <>{children}</>
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
