'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
// import Button from '../Button';

type Props = {
  actionLabel?: string;
  body?: React.ReactNode;
  disabled?: boolean;
  footer?: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  title?: string;
};

const Modal: React.FC<Props> = ({
  actionLabel,
  body,
  disabled,
  footer,
  isOpen,
  onClose,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [setShowModal, disabled, onClose]);

  //useOutsideClick(ref, handleClose, isOpen);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="justify-center items-center flex overflow-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* CONTENT */}
        <div
          ref={ref}
          className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* HEADER */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute right-6"
              >
                <IoMdClose size={26} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* HEADER */}

            {/* BODY */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* BODY */}

            {/* FOOTER */}
            {/* <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel ? (
                  <Button
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    outline
                    disabled={disabled}
                  />
                ) : null}
                <Button
                  onClick={handleSubmit}
                  label={actionLabel}
                  disabled={disabled}
                />
              </div>
              {footer}
            </div> */}
            {/* FOOTER */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
