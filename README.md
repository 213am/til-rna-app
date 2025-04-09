# 컴포넌트 응용한 화면 구성

- `src/screens/ProfileScreen.tsx` 파일 생성

```tsx
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const ProfileScreen = (): JSX.Element => {
  return (
    <SafeAreaView>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
```

- `/src/navigations/ScreenStackNavigator.tsx` 수정

```tsx
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
      <Stack.Screen name="profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export default ScreenStackNavigator;
```

- `src/screens/HomeScreen.tsx` 수정

```tsx
import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title={'About 로 이동'}
          onPress={() => navigation.navigate('about')}
        />
        <Button
          title={'Webview 로 이동'}
          onPress={() => navigation.navigate('webview')}
        />
        <Button
          title={'profile 로 이동'}
          onPress={() => navigation.navigate('profile')}
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

# 컴포넌트 기본 구성

## 1. 기본 화면 구성은 SafeAreaView 부터 셋팅하자

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const ProfileScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
```

## 2. 프로필 스크린 만들어보기

```tsx
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const ProfileScreen = (): JSX.Element => {
  const [name, setName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [submitted, setSubmmited] = useState(false);

  const handlePress = () => {
    if (name.trim() === '' || introduce.trim() === '') {
      Alert.alert('입력값 오류', '이름과 소개를 입력해주세요.', [
        {text: '확인'},
      ]);
      return;
    }
    setSubmmited(true);
    Alert.alert('환영합니다.', `${name}님 환영합니다.`, [{text: '확인'}]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, {width: '100%'}]}>
        {/* 로컬 이미지는 require 사용 */}
        <Image
          source={{uri: `https://picsum.photos/200/300?random=1`}}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력하세요"
        />
        <TextInput
          style={styles.input}
          value={introduce}
          onChangeText={setIntroduce}
          multiline
          placeholder="자기소개를 입력하세요"
        />
        <Button title="나의 프로필" onPress={handlePress} />
        {submitted && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{name}</Text>
            <Text style={styles.resultText}>{introduce}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  resultBox: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
});

export default ProfileScreen;
```

## 3. 오늘 할일 체크리스트 만들기

```tsx
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function ProfileScreen() {
  // 할일 데이터 state
  const [tasks, setTasks] = useState<Task[]>([
    {id: '1', title: '아침 먹기', done: true},
    {id: '2', title: '점심 먹기', done: false},
    {id: '3', title: '저녁 먹기', done: false},
  ]);

  // 할일 목록 중 해당하는 state 의 done 변경
  const toggleSwitch = (id: string) => {
    setTasks(prev =>
      prev.map(item => (item.id === id ? {...item, done: !item.done} : item)),
    );
  };

  const renderItem = ({item}: {item: Task}) => (
    <View style={styles.itemRow}>
      <Text style={[styles.itemText, item.done && styles.checkedText]}>
        {item.done ? '✔' : '✘'}&ensp;{item.title}
      </Text>
      <Switch
        value={item.done}
        onValueChange={() => toggleSwitch(item.id)}
        thumbColor={item.done ? 'skyblue' : 'lightgray'}
        trackColor={{false: 'gray', true: 'yellowgreen'}}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.title}>할일 체크리스트</Text>
        {/* 목록 출력 */}
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={() => Alert.alert('오늘도 화이팅')}
          // onPressIn={() => console.log('onPressIn')}
          // onPressOut={() => console.log('onPressOut')}
        >
          <Text style={styles.buttonText}>메세지 보내기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  viewContainer: {
    flex: 1,
    width: '100%',
    padding: 30,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    alignItems: 'center',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  separator: {
    height: 5,
    backgroundColor: '#f2f2f2',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
```

## 4. 오늘 할일 추가하기 ( 입력창, 리스트 등 )
