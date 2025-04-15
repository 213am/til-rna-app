# Deploy

## 1. Splash Screen (시작화면)

- https://til-choonham.tistory.com/530
- https://github.com/crazycodeboy/react-native-splash-screen
- https://www.npmjs.com/package/react-native-splash-screen

```bash
npm i react-native-splash-screen
```

### 1.1. andorid (MainActivity.java) 수정

- android/app/src/main/java/com/앱이름/MainActivity.java
- 아래 소스는 참조만 하고 추가된 소스만 별도로 작성

```java
package com.rntil;

// 추가된 소스
import android.os.Bundle; // here

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

// 추가된 소스
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "rntil";
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

  // 추가된 소스
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
      super.onCreate(savedInstanceState);
  }

}
```

### 1.2. splash screen 용 이미지 필요

- `900 * 900` : png 파일 추천
- launch_screen.png
- android/app/src/main/res/drawable/ 저장
- android/app/src/main/res/drawable/launch_screen.png

### 1.3. launch_screen.xml 파일 생성 및 배치

- android/app/src/main/res/layout 폴더 생성
- android/app/src/main/res/layout/launch_screen.xml 파일 생성

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>
```

### 1.4. colors.xml 파일 생성 및 배치

- android/app/src/main/res/values/colors.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#000000</color>
</resources>
```

### 1.5. App.tsx 에 적용

```tsx
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView from 'react-native-webview';

const App = (): JSX.Element => {
  const webViewUrl = 'https://app-fish-y3pa.vercel.app';

  // SafeAreaView 는 기기의 indicator 영역을 제외한 컨텐츠 영역 배치
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{uri: webViewUrl}} // 웹뷰에 보여줄 URL 주소
        startInLoadingState={true} // 웹뷰가 로딩 인디케이터 표시
        renderLoading={() => (
          // 웹뷰 로딩 중일 때 표시될 로딩 인디케이터 컴포넌트
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            {/* 로딩 스피너 컴포넌트 */}
          </View>
        )}
        // 로딩 완료
        onLoadEnd={() => {
          console.log('로딩완료');
          setTimeout(() => {
            SplashScreen.hide();
          }, 1000);
        }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
export default App;
```

## 2. Icon

### 2.1. 아이콘을 생성해 주는 서비스

- https://icon.kitchen/
- https://www.appicon.co/

### 2.2. 배치

- android/app/src/main/res 폴더에 붙여넣기
  ![Image](https://github.com/user-attachments/assets/6b4b8d7f-9a8a-4347-90f6-f9ea37f78ee4)

## 3. Back키 처리

- App.tsx

```tsx
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView from 'react-native-webview';

const App = (): JSX.Element => {
  const webViewUrl = 'https://app-fish-y3pa.vercel.app';

  // back 키 처리
  useEffect(() => {
    const backAction = () => {
      Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
        {text: '취소', onPress: () => null, style: 'cancel'},
        {text: '종료', onPress: () => BackHandler.exitApp()},
      ]);
      return true; // 기본 뒤로가기 방지
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // 앱 종료시 이벤트 리스너 정리
  }, []);

  // SafeAreaView 는 기기의 indicator 영역을 제외한 컨텐츠 영역 배치
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{uri: webViewUrl}} // 웹뷰에 보여줄 URL 주소
        startInLoadingState={true} // 웹뷰가 로딩 인디케이터 표시
        renderLoading={() => (
          // 웹뷰 로딩 중일 때 표시될 로딩 인디케이터 컴포넌트
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            {/* 로딩 스피너 컴포넌트 */}
          </View>
        )}
        // 로딩 완료
        onLoadEnd={() => {
          console.log('로딩완료');
          setTimeout(() => {
            SplashScreen.hide();
          }, 1000);
        }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
export default App;
```

## 4. apk 생성

### 4.1. QR 생성하기

- https://me-qr.com/ko/qr-code-generator/link

### 4.2. 마켓에 등록하지 않은 상태로 외부인에게 앱파일을 전달하는 경우

```bash
cd android
```

```bash
./gradlew assembleRelease
```

- apk 별도 생성 작업

  - android/app/build/outputs/apk/release/app-release.apk 복사
  - /test/ 붙여넣고
  - /test/test.apk 로 변경

- github push 후 QR 생성 및 배포

### 4.3. App Deploy

- https://velog.io/@mandoo1229/React-Native-Android-APK-생성
- https://ssilook.tistory.com/entry/React-Native-RN-Android-Studio로-APK-추출하기
- https://velog.io/@2hanbyeol1/RN-Android-앱-배포-1
- https://velog.io/@dev_jiwon/React-Native-Release-APKAAB-추출하기

## 5. 마켓 등록

### 5.1. Deploy Android App

- https://play.google.com/console
- 안드로이드 개발자 등록은 1회 등록으로 지속됨(25$)
  - 개발완료 후 바로 등록은 불가
  - 12명의 테스터 모집, 14일 간 앱설치를 유지
  - 이후 앱 등록이 가능함
- ios 개발자는 매년 갱신(99$)

### 5.2. 단계

![Image](https://github.com/user-attachments/assets/46a1f8fb-18ff-4dd2-96ae-62e223347e5d)

![Image](https://github.com/user-attachments/assets/78625fc6-f788-46a5-8a67-17580ff39f80)

![Image](https://github.com/user-attachments/assets/5cd3c026-6f52-4679-b7c2-d49837504987)

![Image](https://github.com/user-attachments/assets/c3a7e61a-7cd6-41c4-8b18-bc25fe954e21)

### 5.3. 키 생성

- https://reactnative.dev/docs/0.72/signed-apk-android
- 터미널 실행(`CMD`)

#### 5.3.1. JDK 경로 확인

- 각 PC 마다 경로 설정이 다를 수 있다 ( JDK 경로 )
- 윈도우 검색창 => `시스템 환경 변수 편집` => `환경 변수` => 아래 `시스템 변수` 에서 `JAVA_HOME` 항목 선택 => 해당 변수의 값(경로) 확인

- 경로 확인 `C:\Program Files\Microsoft\jdk-17.0.14.7-hotspot\`
- 해당 경로의 bin 폴더로 이동

- 아래 문장을 `윈도우 검색 > cmd` 창에 입력

- `cd C:\Program Files\Microsoft\jdk-17.0.14.7-hotspot\bin`

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore myapp.keystore -alias myapp-alias -keyalg RSA -keysize 2048 -validity 10000
```

![Image](https://github.com/user-attachments/assets/56f5a4b8-45a6-4e1f-b313-81d7433c5c63)

![Image](https://github.com/user-attachments/assets/8e1df14b-fb36-42f2-a60d-6dc5b0989538)

- 생성된 `myapp.keystore` 파일을 `D:\students\tilapp\android\app` 폴더에 복사
- `android/gradle.properties` 파일에 키 정보 추가

```txt
MYAPP_UPLOAD_STORE_FILE=myapp.keystore
MYAPP_UPLOAD_KEY_ALIAS=myapp-alias
MYAPP_UPLOAD_STORE_PASSWORD=123456
MYAPP_UPLOAD_KEY_PASSWORD=123456
```

- 완성본

```java

```

- `android/app/build.gradle` 파일에 키 정보 추가

```txt
release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
```

```txt
signingConfig signingConfigs.release
```

```txt
def enableProguardInReleaseBuilds = true
```

```java
apply plugin: "com.android.application"
apply plugin: "com.facebook.react"

/**
 * This is the configuration block to customize your React Native Android app.
 * By default you don't need to apply any configuration, just uncomment the lines you need.
 */
react {
    /* Folders */
    //   The root of your project, i.e. where "package.json" lives. Default is '..'
    // root = file("../")
    //   The folder where the react-native NPM package is. Default is ../node_modules/react-native
    // reactNativeDir = file("../node_modules/react-native")
    //   The folder where the react-native Codegen package is. Default is ../node_modules/@react-native/codegen
    // codegenDir = file("../node_modules/@react-native/codegen")
    //   The cli.js file which is the React Native CLI entrypoint. Default is ../node_modules/react-native/cli.js
    // cliFile = file("../node_modules/react-native/cli.js")

    /* Variants */
    //   The list of variants to that are debuggable. For those we're going to
    //   skip the bundling of the JS bundle and the assets. By default is just 'debug'.
    //   If you add flavors like lite, prod, etc. you'll have to list your debuggableVariants.
    // debuggableVariants = ["liteDebug", "prodDebug"]

    /* Bundling */
    //   A list containing the node command and its flags. Default is just 'node'.
    // nodeExecutableAndArgs = ["node"]
    //
    //   The command to run when bundling. By default is 'bundle'
    // bundleCommand = "ram-bundle"
    //
    //   The path to the CLI configuration file. Default is empty.
    // bundleConfig = file(../rn-cli.config.js)
    //
    //   The name of the generated asset file containing your JS bundle
    // bundleAssetName = "MyApplication.android.bundle"
    //
    //   The entry file for bundle generation. Default is 'index.android.js' or 'index.js'
    // entryFile = file("../js/MyApplication.android.js")
    //
    //   A list of extra flags to pass to the 'bundle' commands.
    //   See https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle
    // extraPackagerArgs = []

    /* Hermes Commands */
    //   The hermes compiler command to run. By default it is 'hermesc'
    // hermesCommand = "$rootDir/my-custom-hermesc/bin/hermesc"
    //
    //   The list of flags to pass to the Hermes compiler. By default is "-O", "-output-source-map"
    // hermesFlags = ["-O", "-output-source-map"]
}

/**
 * Set this to true to Run Proguard on Release builds to minify the Java bytecode.
 */
def enableProguardInReleaseBuilds = true

/**
 * The preferred build flavor of JavaScriptCore (JSC)
 *
 * For example, to use the international variant, you can use:
 * `def jscFlavor = 'org.webkit:android-jsc-intl:+'`
 *
 * The international variant includes ICU i18n library and necessary data
 * allowing to use e.g. `Date.toLocaleString` and `String.localeCompare` that
 * give correct results when using with locales other than en-US. Note that
 * this variant is about 6MiB larger per architecture than default.
 */
def jscFlavor = 'org.webkit:android-jsc:+'

android {
    ndkVersion rootProject.ext.ndkVersion

    compileSdkVersion rootProject.ext.compileSdkVersion

    namespace "com.tilapp"
    defaultConfig {
        applicationId "com.tilapp"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
        // debug {
        //     storeFile file('debug.keystore')
        //     storePassword 'android'
        //     keyAlias 'androiddebugkey'
        //     keyPassword 'android'
        // }
    }
    buildTypes {
        // debug {
        //     signingConfig signingConfigs.debug
        // }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.release
            // signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}

dependencies {
    // The version of react-native is set by the React Native Gradle Plugin
    implementation("com.facebook.react:react-android")

    debugImplementation("com.facebook.flipper:flipper:${FLIPPER_VERSION}")
    debugImplementation("com.facebook.flipper:flipper-network-plugin:${FLIPPER_VERSION}") {
        exclude group:'com.squareup.okhttp3', module:'okhttp'
    }

    debugImplementation("com.facebook.flipper:flipper-fresco-plugin:${FLIPPER_VERSION}")
    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation jscFlavor
    }
}

apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
apply from: file ("../../node_modules/react-native-vector-icons/fonts.gradle") // add this line
```

```bash
npx react-native build-android --mode=release
```

- `android/app/build/outputs/bundle/release` 폴더에 배포 파일 생성

![Image](https://github.com/user-attachments/assets/01c35af8-153d-4c1f-ae72-3e7cc26ba4ce)
