# 프로젝트 폴더 구성(참조)

- `yarn.lock 파일 삭제`
- `/src 폴더` 생성
- `/assets 폴더` 생성
- `/utils 폴더` 생성
- `/api 폴더` 생성

## /src 하위폴더 생성(참조)

- `/src/components 폴더` 생성
- `/src/screens 폴더` 생성
- `/src/navigations 폴더` 생성

# 라우터 셋팅(Screen 경로)

- https://reactnavigation.org/docs/getting-started/
- https://reactnative.dev/docs/navigation
- [참조](https://velog.io/@slobber/React-native-navigation-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0)

## 라우터 npm 설치

- 버전을 맞추어주셔야 정상 작동합니다.
- 설치되는 순서도 주의해 주면 좋다.

```bash
npm install @react-navigation/native@6.1.18
npm install @react-navigation/stack@6.4.1
npm install @react-native-masked-view/masked-view@0.3.1
npm install react-native-gesture-handler@2.20.0
npm install react-native-safe-area-context@4.11.0
npm install react-native-screens@3.34.0
```

## java 수정

- `/android/app/main/java/com/프로젝트폴더/MainActivity.java` 수정

```java
import android.os.Bundle; // 추가
```

```java
// 추가
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
```

## 프로젝트를 깨끗하게 정리하는 법

```bash
cd android
```

```bash
./gradlew clean
```

```bash
cd ..
```

# Screen 구성

- /src/screens/HomeScreen.tsx 파일 생성

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const HomeScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

export default HomeScreen;
```

- /src/screens/AboutScreen.tsx 파일 생성

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>About Screen</Text>
      </View>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
export default AboutScreen;
```

- /src/screens/WebViewScreen.tsx 파일 생성

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const WebViewScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>WebView Screen</Text>
      </View>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
});
export default WebViewScreen;
```

# 네비게이션 설정

- `/src/navigations/ScreenStackNavigator.tsx 파일` 생성

```tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import WebViewScreen from '../screens/WebViewScreen';

const ScreenStackNavigator = () => {
  // screen 스택에 대한 정보관리
  // 관례상 변수명을 Stack 으로 한다.(참조)
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="WebView" component={WebViewScreen} />
    </Stack.Navigator>
  );
};

export default ScreenStackNavigator;
```

- /index.js 네이게이터 연결

```js
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// 네비게이터 추가
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
```

- App.tsx 추가 및 수정

```tsx
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
```

# 프로젝트 실행

```bash
npm start
```

```bash
a
```

# Stack 이동

- /src/HomeScreen.tsx 추가

```tsx
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home Screen</Text>
        <Button
          title={'About 로 이동'}
          onPress={() => navigation.navigate('About')}
        />
        <Button
          title={'WebView 로 이동'}
          onPress={() => navigation.navigate('WebView')}
        />
      </View>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default HomeScreen;
```

# Webview 적용

## webview 설치

- https://www.npmjs.com/package/react-native-webview

```bash
npm i react-native-webview
```

## webview 적용

- Next 또는 React 프로젝트 생성 후 local로 실행 후 테스트
- /src/screens/WebViewScreen.tsx

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (): JSX.Element => {
  const webUrl = 'http://192.168.0.66:3000';
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{uri: webUrl}} />
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
export default WebViewScreen;
```

## 로딩 상태 표현

- https://velog.io/@ttoottie/RN-데이터-로딩-UI를-자연스럽게-구성해보자

```tsx
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (): JSX.Element => {
  const webUrl = 'http://192.168.0.66:3000';
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: webUrl}} // webview 에 보여줄 주소
        startInLoadingState={true} // webview 로딩 인디케이터 표시
        // 로딩 중일 때 보여줄 내용
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      />
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
export default WebViewScreen;
```

# Webview JS 연동

## 1. 웹 서비스에 셋팅하는 법

- React 또는 Next 에서 셋팅하는 법

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useEffect, useState} from 'react';

function Home() {
  // 전달받은 메세지를 확인하는 용도
  const [message, setMessage] = useState<string>('');

  // React Native 로 메시지 보내기
  // React Native 로 메시지를 보낼때는 아래의 형식을 준수해 주시면 됩니다.
  // React Native 의 onMessage 가 실행이 됩니다.
  // 시간 메시지를 React Native 로 메시지 보내기
  const handleTime = () => {
    (window as any).ReactNativeWebView?.postMessage(new Date().toISOString());
  };
  // count 값을 0 으로 초기화 React Native 로 메시지 보내기
  const handleCount = () => {
    (window as any).ReactNativeWebView?.postMessage('INIT_DATA');
  };

  // window 에서 받은 메세지를 처리함.
  // 하나의 형식 즉, 외부에서 전달된 메세지를 받음.
  const handleMessage = (event: MessageEvent) => {
    try {
      // 메세지로 전달된 원본 데이터
      const rawData = event.data;

      // 타입 체크
      const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
      if (!data) {
        return;
      }
      // 전달된 data 는  type 과 payload 속성이 존재합니다.
      // type 은 여러분이 원하는데로 작성하시면 됩니다.
      if (data.type === 'INIT_DATA') {
        setMessage(`${data.payload.message}`);
      } else if (data.type === 'UPDATE_COUNT') {
        setMessage(`UPDATE : ${data.payload.count}`);
      }
    } catch (error) {
      console.log('메시지 파싱 에러 : ', error);
      setMessage(`ERROR : ${error}`);
    }
  };

  // 화면에 보이면 addEventListener 로 이벤트 핸들러 등록
  useEffect(() => {
    window.addEventListener('message', handleMessage);

    // 클린업 함수 : 화면에서 사라지면 이벤트 핸들러는 해제해주셔야 합니다.
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <div>전달받은 메세지 : {message}</div>
      <div className="flex flex-col gap-5 justify-between">
        <button className="border" onClick={handleTime}>
          날짜 보내기
        </button>
        <button className="border" onClick={handleCount}>
          Count 초기화 보내기
        </button>
      </div>
    </div>
  );
}

export default Home;
```

## 2. React Native에 셋팅하는 법

```tsx
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (): JSX.Element => {
  const webUrl = 'http://192.168.0.66:3000';

  // WebView 의 url 에 있는 페이지가 모두 로딩이 되었는지 체크
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // 어떤 WebView를 대상으로 메시지 체크를 할 것인가?
  const webViewRef = useRef<WebView>(null);

  // count state 관련
  const [count, setCount] = useState<number>(0);
  // 전달 받은 message 관련
  const [message, setMessage] = useState<string>('');

  // 웹 뷰로 데이터를 보내는 함수
  const sendDataWeb = (data: any) => {
    const messageData = JSON.stringify(data);
    webViewRef.current?.injectJavaScript(`
      window.postMessage('${messageData}', '*');
      true;
    `);
  };

  // 웹 뷰로 부터 데이터를 받는 함수
  const onMessage = (event: any) => {
    const data = event.nativeEvent.data;
    console.log(data);

    if (data === 'load') {
      setIsLoaded(true);
      // 모두 준비가 되었으니 Webview 로 메시지를 보내준다.
      sendDataWeb({type: 'INIT_DATA', payload: {message: 'Hellow Next!'}});
      return;
    }
    // Webview 에서 INIT_DATA 글자가 전송된 경우
    if (data === 'INIT_DATA') {
      setCount(0);
      return;
    }
    // 날짜가 전송된 경우
    setMessage(data);
  };
  // 버튼 클릭시 count 값을 1 올려주고, 데이터 전송
  const handleButtonClick = () => {
    const temp = count + 1;
    setCount(temp);
    // Webview 로 전송
    sendDataWeb({type: 'UPDATE_COUNT', payload: {count: temp}});
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onMessage={onMessage}
        injectedJavaScript={`
            window.ReactNativeWebView.postMessage('load');
            window.addEventListener('message', function(event){
                try {
                    const data = JSON.parse(event.data);
                    if(data.type === 'UPDATE_COUNT' ) {
                        // 웹페이지에서 카운트 데이터 처리
                        console.log('Count updated : ', data.payload.count)
                    }
                } catch (e) { 
                 console.log(e)
                }
            });
            true;
        `}
        style={styles.webview}
        source={{uri: webUrl}} // webview 에 보여줄 주소
        startInLoadingState={true} // webview 로딩 인디케이터 표시
        // 로딩 중일 때 보여줄 내용
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      />
      <View style={styles.messageContainer}>
        <Text>{message}</Text>
      </View>
      <View style={styles.control}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={handleButtonClick}>
          <Text style={styles.buttonTxt}>{count}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  control: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTxt: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default WebViewScreen;
```
