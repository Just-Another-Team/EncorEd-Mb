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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TestTheme } from './src/styles';

function App(): JSX.Element {
  return (
    <PaperProvider theme={TestTheme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef}>
          <AuthStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

export default App;
