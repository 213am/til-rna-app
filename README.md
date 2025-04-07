# 프로젝트 생성

- 각 라이브러리 버전을 꼭 맞추어주셔야 원활하게 진행 됨.
  >
- 생성법

```bash
npx react-native@0.72.6 init 프로젝트명 --version 0.72.6
```

- 예제

```bash
npx react-native@0.72.6 init tilapp --version 0.72.6
```

## 프로젝트 생성 시 template 파일이 없다는 오류

- 예시

```bash
error Couldn't find the "C:\Users\ADMINI~1\AppData\Local\Temp\rncli-init-template-thkunt\node_modules\react-native\template.config.js file inside "react-native" template. Please make sure the template is valid.
```

- 아래 문장으로 프로젝트 생성해보기

```bash
 npx react-native@0.72.6 init 프로젝트명 --version 0.72.6 -npm
```

## Android Studio 실행

- Android Studio > Device Manager 에서 Android Virtual Machine 실행 후 진행

# 프로젝트 실행

```bash
npm start

a - run on Android
```

# 프로젝트 환경 설정

## typescript 설정

```bash
npm install --save-dev typescript @types/react @types/react-native @babel/preset-typescript
```

```bash
npm install --save-dev @tsconfig/react-native
```

## tsconfig 설정

- `tsconfig.json` 수정

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "types": ["react-native"],
    "lib": ["es2019"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

## eslint 설정

- `.eslintrc.js` 수정

```js
module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
```

## 테스트

- `App.tsx`

```tsx
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const App = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
        <Text>안녕하세요</Text>
      </View>
    </SafeAreaView>
  );
};
export default App;
```

```bash
npm start

a - run on android
```
