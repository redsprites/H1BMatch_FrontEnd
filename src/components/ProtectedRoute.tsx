import React from 'react';
import { useAuth } from '@clerk/clerk-react';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isSignedIn } = useAuth();

  // If user is signed in, render the child component (e.g., MatchingJobs)
  // Otherwise, redirect to the sign-in page
  return isSignedIn ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
