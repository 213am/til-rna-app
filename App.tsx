import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ScreenStackNavigator from './src/navigations/ScreenStackNavigator';

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <ScreenStackNavigator />
    </NavigationContainer>
  );
};
export default App;
