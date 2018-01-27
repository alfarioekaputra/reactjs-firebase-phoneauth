import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  phonenumber: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      phonenumber,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithPhoneNumber(phonenumber)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      phonenumber,
      error,
    } = this.state;

    const isInvalid =
      phonenumber === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={phonenumber}
          onChange={event => this.setState(byPropKey('phonenumber', event.target.value))}
          type="text"
          placeholder="Phonenumber"
        />
        
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};