import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  isActive: boolean = true
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (!isActive) return;
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};
