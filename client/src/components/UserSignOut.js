import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Signs a user out when the button is pushed, then redirects to the Courses page.
export default ({ context }) => {
  useEffect(() =>context.actions.signOut());
  return (
    <Redirect to="/" />
  );
}
