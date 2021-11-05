import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @param {*} props 
 * Create the Header to allow a user to sign up, sign in, or sign out. Also displays the users name if signed in. 
 */
const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
            {authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.Name}</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            : 
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            }
        </nav>
      </div>
    </div>
  );
};

export default Header;
