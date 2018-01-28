import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';

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

  componentDidMount() {
    
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': function () {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
   });
   window.recaptchaVerifier.render().then(function (widgetId) {
     window.recaptchaWidgetId = widgetId;
   });
  }

  onSubmit = (event) => {
    const {
      phonenumber,
    } = this.state;

    const {
      history,
    } = this.props;

    var appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(phonenumber, appVerifier)
      .then((confirmationResult) => {
        var code = prompt('Enter the verification code you received by SMS');
        if (code) {
          confirmationResult.confirm(code).then(function () {
            //window.close();
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.error('Error while checking the verification code', error);
            window.alert('Error while checking the verification code:\n\n'
                + error.code + '\n\n' + error.message)
          });
          
        }
        
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
        <div>
        <div ref={(ref)=>this.recaptcha=ref}></div>
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
        </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};