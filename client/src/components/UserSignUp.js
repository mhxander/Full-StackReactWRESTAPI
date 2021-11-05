import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

// Create Sign Up screen. Allows a user to sign up when all fields are filled
export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword:'',
    errors: [],
  }

  // Renders the Sign Up Form and collects the Form input values.
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
                <input 
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"/>
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
                <input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword} 
                  onChange={this.change} 
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  //Update state based on Form field values.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // Stores submitted info in the API as a new user.  If successful, they are redirected to the courses page
  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    context.data.createUser(user).then( errors => {
      if (errors && errors.length > 0){
        this.setState({ errors });
      } else {
        context.actions.signIn(emailAddress, password)
        .then(() => {
          this.props.history.push('/')
        });
      }
    })
    .catch( err => {
      console.log(err);
      this.props.history.push('/error');
    });
  }
  
  //Redirects to the Courses(index) page when the cancel button is selected. 
  cancel = () => {
    this.props.history.push('/');
  }
}
