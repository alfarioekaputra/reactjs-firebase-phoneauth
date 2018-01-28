import React from 'react';
import { Button } from 'reactbulma'

import { auth } from '../firebase';

const SignOutButton = () =>
  <Button
    danger
    onClick={auth.doSignOut}
  >
    Sign Out
  </Button>

export default SignOutButton;