import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Immediately scroll to the top of the window on route/search change
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};
