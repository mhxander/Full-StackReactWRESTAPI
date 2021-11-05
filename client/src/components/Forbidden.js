import React from 'react';
import { Link } from 'react-router-dom';

// Create Forbidden page, if a user is not Authorized to create, change, or delete a page
const Forbidden = () => {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Oh oh! You can't access this page.</p>
      <div className="button">
        <Link to="/">Return Home</Link>
      </div>
    </div>
  )
}

export default Forbidden;