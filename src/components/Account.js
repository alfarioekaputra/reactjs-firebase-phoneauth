import React from 'react';
import PropTypes from 'prop-types';

import withAuthorization from './withAuthorization';

const AccountPage = (props, { authUser }) =>
  <div>
    <h1>Account: {authUser.phoneNumber}</h1>
  </div>

AccountPage.contextTypes = {
  authUser: PropTypes.object,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);