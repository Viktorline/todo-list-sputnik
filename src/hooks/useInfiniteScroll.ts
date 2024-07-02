import { useEffect, useRef } from 'react';
import { SCROLL_LOAD_DELAY } from '../constants/constants';

const useInfiniteScroll = (
  callback: () => Promise<void>,
  isFetching: boolean,
  delay: number = SCROLL_LOAD_DELAY
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching) {
        setTimeout(() => {
          callback();
        }, delay);
      }
    });

    if (lastElementRef.current)
      observer.current.observe(lastElementRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback, isFetching, delay]);

  return { lastElementRef };
};

export default useInfiniteScroll;
