import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

/**
 * Provider component creates the data for Context to be used throughout the App.
 */
export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    password: Cookies.getJSON('password') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }


  render() {
    const { authenticatedUser, password } = this.state;

    //Getting data to be passed through value to all Children. 
    const value = {
      authenticatedUser,
      password,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //Looks to the API for user information, and returns an authenticated user.
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password;
      user.emailAddress = user.Email;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      //Stores the authenticated user in Cookies for up to 1 day.
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  } 

  //Signs user out and sets authenticated user to Null
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

