import React from 'react';
import { Link }from 'react-router-dom';

// Create a page if an unhandled error occurs
const UnhandledError = () => {
  return(
    <div className="bounds">
      <h1>Error</h1>
      <p>Im sorry, an unexpected Error has occurred!</p>
      <div className="button">
        <Link to="/">Return Home</Link>
      </div>
    </div>
  )
}

export default UnhandledError;