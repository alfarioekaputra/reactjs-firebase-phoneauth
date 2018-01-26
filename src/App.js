import React, { Component } from 'react';
import firebase from 'firebase';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedPage from './ProtectedPage';
import * as Config from './config';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      phoneNumber : '',
      verifyCode : '',
      redirectToReferrer: false
    }
    var config = {
      apiKey: Config.API_KEY,
      authDomain: Config.AUTH_DOMAIN,
      databaseURL: "",
      projectId: Config.PROJECT_ID,
      storageBucket: "",
    };
    firebase.initializeApp(config);
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
  
  firebase.auth().signInWithPhoneNumber(phoneNumber1, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        
        var code = prompt('Enter the verification code you received by SMS');
          if (code) {
            confirmationResult.confirm(code).then(function () {
              //window.close();
              const loginSuccess = '/login-success';
              <Redirect to={loginSuccess}/>
            }).catch(function (error) {
              // User couldn't sign in (bad verification code?)
              console.error('Error while checking the verification code', error);
              window.alert('Error while checking the verification code:\n\n'
                  + error.code + '\n\n' + error.message)
            });
            
          }
      }).catch(function (error) {
        // Error; SMS not sent
        // ...
      });

      
  }
}

export default App;
