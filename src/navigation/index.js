import React from 'react';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {withAuthenticator} from 'aws-amplify-react-native';

/**
 * Wrap all providers here
 */

function Providers() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Providers;
