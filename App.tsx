import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ScreenStackNavigator from './src/navigations/ScreenStackNavigator';
import 'react-native-get-random-values';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <ScreenStackNavigator />
    </NavigationContainer>
  );
};
export default App;
