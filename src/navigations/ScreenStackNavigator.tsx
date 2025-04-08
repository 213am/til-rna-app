import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import WebviewScreen from '../screens/WebviewScreen';

const ScreenStackNavigator = () => {
  // screen 스택에 대한 정보관리
  // 관례상, 변수명을 Pascal case 로 한다 : Stack
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="about" component={AboutScreen} />
      <Stack.Screen name="webview" component={WebviewScreen} />
    </Stack.Navigator>
  );
};
export default ScreenStackNavigator;
