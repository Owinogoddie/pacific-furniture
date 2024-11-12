'use client';

import { MouseEvent, useEffect, useRef } from "react";

// Types
interface Props {
  title: string;
  isOpened: boolean;
  onProceed: (onSubmit: (address: any) => void) => void;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: (address: any) => void;
}

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();
  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

const DialogModal = ({
  title,
  isOpened,
  onProceed,
  onClose,
  onSubmit,
  children,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed(onSubmit);
    onClose();
  };

  return (
    <dialog
      className="dialog-modal"
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
      <h3>{title}</h3>
      {children}
      <div className="dialog-buttons">
        <button onClick={proceedAndClose}>Update</button>
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
};

export default DialogModal;