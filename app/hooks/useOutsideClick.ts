import { MutableRefObject, useEffect } from 'react';

function useOutsideClick(
  currentRef: MutableRefObject<HTMLElement | null>,
  callbackFunc: () => void,
  isOpen: boolean | undefined
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target instanceof HTMLElement)) return;

      if (
        currentRef.current &&
        !currentRef.current.contains(event.target) &&
        isOpen
      ) {
        callbackFunc();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currentRef, isOpen, callbackFunc]);
}

export default useOutsideClick;
