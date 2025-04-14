# Navigator

- 네비게이션 (라우터 처럼 생각하기)

- https://reactnavigation.org/docs/getting-started
- https://reactnative.dev/docs/navigation
  - 위의 내용으로는 어려움이 있습니다.
- [참조](https://velog.io/@slobber/React-native-navigation-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0)

## 1. 환경 셋팅

- https://reactnavigation.org/
- https://reactnavigation.org/docs/stack-navigator

  - `npm install @react-navigation/native@6.1.18`
  - `npm install @react-navigation/stack@6.4.1`
  - `npm install @react-native-masked-view/masked-view@0.3.1`
  - `npm install react-native-gesture-handler@2.20.0`
  - `npm install react-native-safe-area-context@4.11.0`
  - `npm install react-native-screens@3.34.0`

## 2. MainActivity.java 수정

- `android/app/src/main/java/com/프로젝트명/MainActivity.java` 수정
- 샘플 work 프로젝트
  - `android/app/src/main/java/com/tilapp/MainActivity.java` 수정

```java
package com.work;


import com.facebook.react.ReactActivity;
// 추가
import android.os.Bundle;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "work";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

// 추가
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
}
```

## 3. Screen 구성

- `/src/screens/HomeScreen.tsx` 수정

```tsx
import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title={'상세화면으로 이동'}
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
```

- `/src/screens/DetailScreen.tsx` 파일 생성

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const DetailScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>DetailScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DetailScreen;
```

## 4. Navigation 연결하기

- `/App.tsx` 에서 연결

### 4.1. 단계 1.

```tsx
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const App = (): JSX.Element => {
  return <NavigationContainer></NavigationContainer>;
};

export default App;
```

### 4.2. 단계 2.

```tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return <NavigationContainer></NavigationContainer>;
};
export default App;
```

### 4.3. 단계 3.

```tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator></Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
```

### 4.4. 단계 4.

- 현재 screen 을 2개로 구성했으므로 ` <Stack.Screen />` 를 2개 작성

```tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen />
        <Stack.Screen />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
```

### 4.5. 단계 5. 옵션

```tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
```

<br/>

## 5. Stack Navigation 옵션

- Stack 은 화면을 쌓아서 보여줌
- Stack.Screen 은 각각의 화면을 말함

### 5.1. title

```tsx
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{title: '홈 화면'}}
  />
  <Stack.Screen
    name="Details"
    component={DetailScreen}
    options={{title: '상세화면'}}
  />
```

### 5.2. headerStyle, headerTintColor

- 상단바의 색상 및 글자 색상 설정

```tsx
    <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈 화면',
            headerStyle: {backgroundColor: 'skyblue'},
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            title: '상세화면',
            headerStyle: {backgroundColor: 'skyblue'},
            headerTintColor: '#fff',
          }}
        />
```

### 5.3. headerTitleAlign

- 제목 정렬

```tsx
  <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈 화면',
            headerStyle: {backgroundColor: 'skyblue'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            title: '상세화면',
            headerStyle: {backgroundColor: 'skyblue'},
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
          }}
        />
```

### 5.4. headerShown

- 제목을 숨길지 아닐지

```tsx
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈 화면',
            headerStyle: {backgroundColor: 'skyblue'},
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            title: '상세화면',
            headerStyle: {backgroundColor: 'skyblue'},
            headerTintColor: '#fff',
            headerTitleAlign: 'left',
            headerShown: true,
          }}
        />
```

### 5.5. gestureEnabled

- 제스처로 이동하기 활성화/비활성화

```tsx
<Stack.Screen
  name="Details"
  component={DetailScreen}
  options={{
    title: '상세화면',
    headerStyle: {backgroundColor: 'skyblue'},
    headerTintColor: '#fff',
    headerTitleAlign: 'left',
    headerShown: true,
    gestureEnabled: true,
  }}
/>
```

### 5.6. animation

- 화면 전환 애니메이션
  >
- animationEnabled: true,
- animationTypeForReplace: 'push',

  - "push": 새 스크린을 추가하는 애니메이션처럼 보임 (앞으로 이동)

  - "pop": 이전 스크린으로 돌아가는 애니메이션처럼 보임 (뒤로 이동)

```tsx
<Stack.Screen
  name="Details"
  component={DetailScreen}
  options={{
    title: '상세화면',
    headerStyle: {backgroundColor: 'skyblue'},
    headerTintColor: '#fff',
    headerTitleAlign: 'left',
    headerShown: true,
    gestureEnabled: true,
    animationEnabled: true,
    animationTypeForReplace: 'push',
  }}
/>
```

### 5.7. headerRight, headerLeft

- 버튼 만들기

```tsx
<Stack.Screen
  name="Details"
  component={DetailScreen}
  options={{
    title: '상세 화면',
    headerStyle: {backgroundColor: 'hotpink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'left',
    headerShown: true,
    gestureEnabled: true,
    animationEnabled: true,
    animationTypeForReplace: 'push',
    headerRight: () => (
      <Button
        title="Info"
        color={'blue'}
        onPress={() => Alert.alert('안녕')}
      />
    ),
    headerLeft: () => (
      <Button
        title="Info2"
        color={'red'}
        onPress={() => Alert.alert('반가워')}
      />
    ),
  }}
```

- headerLeft 버튼 선택 시 화면(Screen) 이동하기

```tsx
<Stack.Screen
  name="Details"
  component={DetailScreen}
  options={({navigation}) => ({
    title: '상세화면',
    headerStyle: {backgroundColor: 'pink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <Button
        title="뒤로가기"
        color={'orange'}
        onPress={() => navigation.goBack()}
      />
    ),
  })}
/>
```

- headerRight 버튼 선택 시 화면(Screen) 에 데이터 전달하기

```tsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={({navigation}) => ({
    title: '홈 화면',
    headerStyle: {backgroundColor: 'skyblue'},
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerShown: true,
    headerRight: () => (
      <Button
        title="데이터전달하기"
        color={'blue'}
        onPress={() => navigation.navigate('Details', {userId: 1})}
      />
    ),
  })}
/>
```

```tsx
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

// route 에 추가적으로 우리가 만든 prop 전달하기
type RootStackParamList = {
  Details: {userId: number};
};
type DetailRouteProp = RouteProp<RootStackParamList, 'Details'>;

const DetailScreen = () => {
  const route = useRoute<DetailRouteProp>();
  const {userId} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{userId} 상세화면입니다.</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DetailScreen;
```

## 6. Tab Navigation

```bash
npm install @react-navigation/bottom-tabs@^6.x
```

### 6.1. 기본 테스트

- App.tsx 수정

```tsx
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Details" component={DetailScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

### 6.2. title 옵션

```tsx
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{title: '홈 화면'}}
/>
<Tab.Screen
  name="Details"
  component={DetailScreen}
  options={{title: '상세 화면'}}
/>
```

### 6.3. headerStyle, headerTintColor

```tsx
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: '홈 화면',
    headerStyle: {backgroundColor: 'skyblue'},
    headerTintColor: '#fff',
  }}
/>
<Tab.Screen
  name="Details"
  component={DetailScreen}
  options={{
    title: '상세 화면',
    headerStyle: {backgroundColor: 'hotpink'},
    headerTintColor: '#fff',
  }}
/>
```

### 6.4. headerTitleAlign

```tsx
<Tab.Screen
  name="Details"
  component={DetailScreen}
  options={{
    title: '상세 화면',
    headerStyle: {backgroundColor: 'hotpink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
  }}
/>
```

### 6.5. tabBarLabel

- 탭 버튼에 출력되는 글자

```tsx
<Tab.Screen
  name="Details"
  component={DetailScreen}
  options={{
    title: '상세 화면',
    headerStyle: {backgroundColor: 'pink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    tabBarLabel: '상세',
  }}
/>
```

### 6.6. tabBarIcon

```bash
npm install react-native-vector-icons
npm install -D @types/react-native-vector-icons
```

- `/android/app/build.gradle` 에 내용 추가 ( 경로 필수 확인)

```java
apply from: file ("../../node_modules/react-native-vector-icons/fonts.gradle")
```

- 아이콘 목록 : https://oblador.github.io/react-native-vector-icons/

```tsx
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈 화면',
            headerStyle: {backgroundColor: 'skyblue'},
            headerTintColor: '#fff',
            tabBarLabel: '홈',
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';
              iconName = focused ? 'home' : 'home-outline';
              // 아이콘 반환
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailScreen}
          options={{
            title: '상세 화면',
            headerStyle: {backgroundColor: 'pink'},
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            tabBarLabel: '상세',
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';
              iconName = focused ? 'heart-circle' : 'heart-circle-outline';
              // 아이콘 반환
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

### 6.7. tabBarActiveTintColor / tabBarInactiveTintColor

- tabBarActiveTintColor : 버튼 활성화 시
- tabBarInactiveTintColor : 버튼 비활성화 시

```tsx
<Tab.Screen
  name="Details"
  component={DetailScreen}
  options={{
    title: '상세 화면',
    headerStyle: {backgroundColor: 'pink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    tabBarLabel: '상세',
    tabBarIcon: ({focused, color, size}) => {
      let iconName = '';
      iconName = focused ? 'heart-circle' : 'heart-circle-outline';
      // 아이콘 반환
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
  }}
/>
```

### 6.8. headerShown

- 상단 타이틀 출력하지 않기

```tsx
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: '홈 화면',
    headerStyle: {backgroundColor: 'skyblue'},
    headerTintColor: '#fff',
    tabBarLabel: '홈',
    tabBarIcon: ({focused, color, size}) => {
      let iconName = '';
      iconName = focused ? 'home' : 'home-outline';
      // 아이콘 반환
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
  }}
/>
```

### 6.9. tabBarStyle

```tsx
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: '홈 화면',
    headerStyle: {backgroundColor: 'skyblue'},
    headerTintColor: '#fff',
    tabBarLabel: '홈',
    tabBarIcon: ({focused, color, size}) => {
      let iconName = '';
      iconName = focused ? 'home' : 'home-outline';
      // 아이콘 반환
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
    tabBarStyle: {
      backgroundColor: 'skyblue',
      height: 70,
      paddingBottom: 5,
    },
  }}
/>
```

### 6.10. tabBarBadge

- 탭바 메뉴 아이콘 우측 상단에 메세지 알림 등 출력

```tsx
<Tab.Screen
  name="Details"
  component={DetailScreen}
  options={{
    title: '상세 화면',
    headerStyle: {backgroundColor: 'pink'},
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    tabBarLabel: '상세',
    tabBarIcon: ({focused, color, size}) => {
      let iconName = '';
      iconName = focused ? 'heart-circle' : 'heart-circle-outline';
      // 아이콘 반환
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    tabBarBadge: 3,
  }}
/>
```

### 6.11. tabBarShowLabel

- tabBar 의 아이콘만 보기

```tsx
<Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    title: '홈 화면',
    headerStyle: {backgroundColor: 'skyblue'},
    headerTintColor: '#fff',
    tabBarLabel: '홈',
    tabBarIcon: ({focused, color, size}) => {
      let iconName = '';
      iconName = focused ? 'home' : 'home-outline';
      // 아이콘 반환
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'blue',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
    tabBarStyle: {
      backgroundColor: 'skyblue',
      height: 70,
      paddingBottom: 5,
    },
    tabBarShowLabel: false,
  }}
/>
```

<br/>

## 7. Drawer Navigation

- `babel.config.js` 내용 추가

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'], // 반드시 마지막 줄에!
};
```

```bash
npm i react-native-reanimated@3.5.4
npm install @react-navigation/drawer@6.6.9
```

>

- 디버깅 1. ( 문제 발생 시 )

```bash
cd android && ./gradlew clean && cd ..

npx react-native run-android
```

- 디버깅 2. ( 문제 발생 시 )

```bash
# 1. 캐시 및 빌드 폴더 삭제
rm -rf node_modules android/app/build android/.gradle

# 2. 패키지 재설치
npm install

# 3. Metro 번들러 캐시 초기화
npx react-native start --reset-cache
```

### 7.1. 옵션 모두 기본 정리

```tsx
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
// 아이콘
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerType: 'front', // 메뉴 보여주는 옵션
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            drawerLabel: '나의 홈',
            drawerIcon: ({color, size}) => (
              <Icon name="person-outline" size={size} color={color} />
            ),
            drawerActiveTintColor: 'blue',
            drawerInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: 'skyblue',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
        />
        <Drawer.Screen name="Details" component={DetailScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

<br/>
