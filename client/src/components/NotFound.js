import React from 'react';
import { Link } from 'react-router-dom';

// Creates a 404 NotFound page
const Notfound = () => {
  return(
    <div className="bounds">
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <div className="button">
        <Link to="/">Return Home</Link>
      </div>
    </div>
  )
}

export default Notfound;