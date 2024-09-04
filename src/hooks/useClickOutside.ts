import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  reset: () => void,
  resetButtonRef: React.RefObject<HTMLDivElement>,
  externalRef?: React.RefObject<T>
) {
  const internalRef = useRef<T>(null);

  // Use `useImperativeHandle` to combine refs
  useImperativeHandle(externalRef, () => internalRef.current as T);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (internalRef.current && !internalRef.current.contains(event.target as Node)) {
        if (
          resetButtonRef.current &&
          resetButtonRef.current.contains(event.target as Node)
        ) {
          reset();
        } else {
          callback();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, reset, resetButtonRef]);

  return internalRef;
}

export default useClickOutside;
