/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, Text } from 'react-native-paper';
import AuthStack from './src/navigators/AuthStack';
import { navigationRef } from './src/navigators/RootNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TestTheme } from './src/styles';
import { Provider } from 'react-redux'
import store, { persistor } from './src/app/encored-store';
import { PersistGate } from 'redux-persist/integration/react';

//Changed. Keep watch on this

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <PaperProvider theme={TestTheme}>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer ref={navigationRef}>
              <AuthStack />
            </NavigationContainer>
          </GestureHandlerRootView>
        </PaperProvider>
      </PersistGate>
    </Provider>
    
  );
}

export default App;
