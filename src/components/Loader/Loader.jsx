import { useEffect } from 'react';
import { Loading } from 'notiflix';

export const Loader = () => {
  useEffect(() => {
    return () => {
      Loading.remove();
    };
  }, []);

  return Loading.circle();
};
