import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useOsStore from '../store/osStore';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useOsStore(state => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /auth page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
