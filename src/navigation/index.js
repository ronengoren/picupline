import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import {withAuthenticator} from 'aws-amplify-react-native';

/**
 * Wrap all providers here
 */

function Providers() {
  return (
    <PaperProvider>
      <Routes />
    </PaperProvider>
  );
}

export default withAuthenticator(Providers);
