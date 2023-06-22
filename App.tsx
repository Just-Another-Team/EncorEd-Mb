/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Landing from './src/pages/Landing';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen 
      name='Landing' 
      options={{
        headerShown: false
      }}
      component={Landing} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
