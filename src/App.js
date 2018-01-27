import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';

import * as routes from './constants/routes';

const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route
        exact path={routes.LANDING}
        component={() => <LandingPage />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route
        exact path={routes.HOME}
        component={() => <HomePage />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <AccountPage />}
      />
    </div>
  </Router>

export default App;

//import firebase from 'firebase';
//import { Switch, Route, Redirect } from 'react-router-dom';
//import ProtectedPage from './ProtectedPage';
//import * as Config from './config';


/*var config = {
  apiKey: Config.API_KEY,
  authDomain: Config.AUTH_DOMAIN,
  databaseURL: "",
  projectId: Config.PROJECT_ID,
  storageBucket: "",
};
firebase.initializeApp(config);
const auth = firebase.auth();

export const doSignInWithPhoneNumber = (phoneNumber, appVerifier) =>
  auth.signInWithPhoneNumber(phoneNumber, appVerifier);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      phoneNumber : '',
      verifyCode : '',
      redirectToReferrer: false
    }
    
    this.success = 0;
    
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
  
  render() {
    const loginSuccess = '/login-success';
    const { redirectToReferrer } = this.state
    console.log('login = '+redirectToReferrer);
    if (redirectToReferrer) {
      return (
        <Redirect to={loginSuccess}/>
      )
    }
    return (
      <div className="App">
        <Switch>
            <Route exact path="/login-success" component={ProtectedPage} />
          </Switch>
        <div ref={(ref)=>this.recaptcha=ref}></div>
        <input
            value={this.state.phoneNumber}
            onChange={e => this.setState({ phoneNumber: e.target.value })}
            type="text"
            placeholder="Your phone number"
          />
        <a className="button is-primary" onClick={() => this._signIn()}>Sign in</a>
        
      </div>
    );
  }

  _signIn = async () => {
    
    const { phoneNumber } = this.state
    var phoneNumber1 = phoneNumber;
    
  var appVerifier = window.recaptchaVerifier;
  
  doSignInWithPhoneNumber(phoneNumber1, appVerifier)
    .then((confirmationResult) => {
      var code = prompt('Enter the verification code you received by SMS');
          if (code) {
            confirmationResult.confirm(code).then(function () {
              //window.close();
              this.setState ({
                redirectToReferrer : true
              })
            }).catch(function (error) {
              // User couldn't sign in (bad verification code?)
              console.error('Error while checking the verification code', error);
              window.alert('Error while checking the verification code:\n\n'
                  + error.code + '\n\n' + error.message)
            });
            
          }
    })
    .catch(error => {
      //this.setState(byPropKey('error', error));
    });
  firebase.auth().signInWithPhoneNumber(phoneNumber1, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        
        var code = prompt('Enter the verification code you received by SMS');
          if (code) {
            confirmationResult.confirm(code).then(function () {
              //window.close();
              this.setState ({
                redirectToReferrer : true
              })
            }).catch(function (error) {
              // User couldn't sign in (bad verification code?)
              console.error('Error while checking the verification code', error);
              window.alert('Error while checking the verification code:\n\n'
                  + error.code + '\n\n' + error.message)
            });
            
          }
      }.bind(this)).catch(function (error) {
        // Error; SMS not sent
        // ...
      });*/

      
 /* }
}

export default App;*/
