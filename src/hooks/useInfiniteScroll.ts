import { useEffect, useRef } from 'react';

const useInfiniteScroll = (
  callback: () => Promise<void>,
  isFetching: boolean,
  delay: number = 150
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

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
