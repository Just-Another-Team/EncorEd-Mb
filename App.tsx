/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AuthStack from './src/navigators/AuthStack';
import { navigationRef } from './src/navigators/RootNavigation';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer ref={navigationRef}>
        <AuthStack />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
