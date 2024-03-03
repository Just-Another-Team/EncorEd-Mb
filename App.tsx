/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, Text } from 'react-native-paper';
import AuthStack from './src/routes';
import { navigationRef } from './src/routes/RootNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import store, { persistor } from './src/app/encored-store';
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox } from 'react-native'
import { Theme } from './src/assets/styles/theme';
import { config } from './src/types/screenConfig';

//Changed. Keep watch on this
LogBox.ignoreLogs(['Warning: ....']);
LogBox.ignoreAllLogs();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <PaperProvider theme={Theme}>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer
            ref={navigationRef}
            linking={{
              prefixes: ["encored://app"],
              config
            }}>
              <AuthStack />
            </NavigationContainer>
          </GestureHandlerRootView>
        </PaperProvider>
      </PersistGate>
    </Provider>
    
  );
}

export default App;
