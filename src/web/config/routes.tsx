import { BrowserRouter, Route, Routes as RoutesManager } from 'react-router-dom'
import { Callback, Home, NotFound } from '../pages';
import redirect from '../config/redirect';
import { useLenis } from '../utils';
import { useEffect } from 'react';

const Routes = () => {

  // remove below line if you don't want to use lenis smooth scroll
  useEffect(() => { useLenis() }, []) 

  const RedirectHandler = () => {
    const currentPath = window.location.pathname;
    const redirectUrl = redirect[currentPath];
    if (redirectUrl) {
      window.location.href = redirectUrl;
      return null;
    }
    return <><NotFound /></>
  };

  const RedirectComponent = () => <RedirectHandler />;

  return (
    <BrowserRouter>
      <RoutesManager>
        <Route path="/" element={<><Home /></>} />
        <Route path="/auth/discord/callback" element={<Callback />} />

        {Object.keys(redirect).map((path) => (
          <Route path="*" key={path} element={<RedirectComponent />} />
        ))}
        <Route path="*" element={<RedirectHandler />} />
      </RoutesManager>
    </BrowserRouter>
  )
}

export default Routes;