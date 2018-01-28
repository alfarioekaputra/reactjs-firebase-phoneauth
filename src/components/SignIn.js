import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import Phone from 'react-phone-number-input';

import '../assets/css/login.css'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'

import { auth } from '../firebase';
import * as routes from '../constants/routes';
import Navigation from './Navigation';

/* style */
import {Hero, Container, Title, SubTitle, Box, Input, Button} from 'reactbulma';

const SignInPage = ({ history }) =>
  <div>
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
    auth.doSignInWithPhoneNumber(phonenumber, appVerifier)
      .then((confirmationResult) => {
        var code = prompt('Enter the verification code you received by SMS');
        if (code) {
          confirmationResult.confirm(code).then(function () {
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
        <Hero success fullheight>
        <Hero.Body>
            <Container hasTextCentered>
                <div className="column is-4 is-offset-4">
                    <Title className="has-text-grey">
                        Login
                    </Title>
                    <SubTitle className="has-text-grey">
                        Please login to proceed.
                    </SubTitle>
                    <Box>
                        <figure className="avatar">
                            <img src="https://placehold.it/128x128" />
                        </figure>
                        <form>
                            <div className="field">
                                <div className="control">
                                    <Phone
                                        country="ID"
                                        placeholder="Enter phone number"
                                        value={ phonenumber }
                                        onChange={event => this.setState(byPropKey('phonenumber', event.target.value))}/>
                                </div>
                            </div>
                            <Button block info large disabled={isInvalid} onClick={this.onSubmit}>
                                Sign In
                            </Button>
                        </form>
                    </Box>
                </div>
            </Container>
        </Hero.Body>
        </Hero>

            
            

            { error && <p>{error.message}</p> }
        
        </div>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};