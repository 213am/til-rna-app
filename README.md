# Component

- https://reactnative.dev/docs/0.72/components-and-apis
- 참고로 scss, css 는 사용하지 않습니다.
- emotion 은 별도의 적용과정이 필요하다.

```bash
npm start
```

```bash
a
```

## View

- html 의 div 의 역할을 수행함.
- View 는 css 로 모양, 너비 등등을 셋팅한다.
- View 는 옵션으로 style 이 있음.
- 아래는 인라인 스타일

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'green',
          margin: 10,
          borderWidth: 2,
          borderRadius: 10,
          borderColor: '#ff0000',
          width: 100,
          height: 200,
        }}
      />
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AboutScreen;
```

- 아래는 객체 변수 정의 스타일

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle} />
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    padding: 20,
    backgroundColor: 'green',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ff0000',
    width: 100,
    height: 200,
  },
});
export default AboutScreen;
```

- 일반적인 구성 : flex 를 많이 활용합니다.

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <Text>안녕하세요.</Text>
        <Text>안녕하세요.</Text>
      </View>
      <View style={styles.viewStyle2} />
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  viewStyle2: {
    flex: 2,
    backgroundColor: 'orange',
  },
});
export default AboutScreen;
```

## Text

- 글자를 보여주는 컴포넌트
- 겹침이 가능하다.

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <Text>안녕하세요.</Text>
      </View>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    flex: 1,
  },
});
export default AboutScreen;
```

- numberOfLines : 글의 행수
- ellipsizeMode : 말줄임 표현 (기본 tail)
- ellipsizeMode 는 numberOfLines 이 1인 경우 정상 작동함.
- ellipsizeMode 는 numberOfLines 이 2이상인 경우 tail.

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsa,
          velit, quos modi quaerat tempore assumenda, quam magni accusantium
          mollitia error distinctio voluptatem dolor perspiciatis? Odio soluta
          illo quibusdam asperiores!
        </Text>
      </View>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
});
export default AboutScreen;
```

- onPress

```tsx
<Text
  style={styles.text}
  numberOfLines={1}
  ellipsizeMode="tail"
  onPress={() => Alert.alert('클릭')}>
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsa, velit,
  quos modi quaerat tempore assumenda, quam magni accusantium mollitia error
  distinctio voluptatem dolor perspiciatis? Odio soluta illo quibusdam
  asperiores!
</Text>
```

- selectable: 드래그 해서 복사 가능하도록

```tsx
<Text
  style={styles.text}
  numberOfLines={1}
  ellipsizeMode="tail"
  // onPress={() => Alert.alert('클릭')}
  selectable>
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem ipsa, velit,
  quos modi quaerat tempore assumenda, quam magni accusantium mollitia error
  distinctio voluptatem dolor perspiciatis? Odio soluta illo quibusdam
  asperiores!
</Text>
```

- Text 중첩

```tsx
<Text
  style={styles.text}
  numberOfLines={1}
  ellipsizeMode="tail"
  // onPress={() => Alert.alert('클릭')}
  selectable>
  Lorem, ipsum dolor <Text style={{color: 'green'}}>sit amet</Text> consectetur
  adipisicing elit. Quidem ipsa, velit, quos modi quaerat tempore assumenda,
  quam magni accusantium mollitia error distinctio voluptatem dolor
  perspiciatis? Odio soluta illo quibusdam asperiores!
</Text>
```

## TextInput

- 글자 입력창

```tsx
import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <TextInput style={styles.input} />
      </View>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
});
export default AboutScreen;
```

- placeholder : 안내문
- value : 값
- `onChangeText` : 텍스트 변경시 처리

```tsx
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력하세요"
          value={name}
          onChangeText={setName}
        />
        <Text>{name}</Text>
      </View>
    </SafeAreaView>
  );
};
// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
});
export default AboutScreen;
```

- secureTextEntry : 입력값을 ... 처리

```tsx
<TextInput
  style={styles.input}
  placeholder="비밀번호를 입력하세요"
  secureTextEntry={true}
/>
```

- keyboardType : 키패드 타입 정의

```tsx
<TextInput
  style={styles.input}
  placeholder="숫자 키패드를 띄우기"
  keyboardType="numeric"
/>
```

- multiline : 여러줄 입력

```tsx
<TextInput
  style={styles.input}
  placeholder="일반 키패드를 띄우기"
  keyboardType="default"
  multiline={true}
/>
```

- maxLength: 최대 글자수

```tsx
<TextInput style={styles.input} placeholder="10자 제한" maxLength={10} />
```

- autoCapitalize : 자동 대문자시작

```tsx
<TextInput
  style={styles.input}
  placeholder="대문자 시작(Capitalize)"
  autoCapitalize="words"
/>
```

- returnKeyType/ onSubmitEditing : 엔터키 처리

```tsx
<TextInput
  style={styles.input}
  placeholder="대문자 시작(Capitalize)"
  autoCapitalize="words"
  returnKeyType="done"
  onSubmitEditing={() => Alert.alert('엔터키')}
/>
```

## Button

- 기본 버튼

```tsx
<Button title="클릭" onPress={() => Alert.alert('클릭')} />
```

- title : 버튼 글자
- onPress : 이벤트 실행
- color : 버튼 색상 (iOS 에서는 글자 색상)
- disabled : 버튼 활성/비활성

```tsx
<Button
  title="클릭"
  onPress={() => Alert.alert('클릭')}
  color={'red'}
  disabled={true}
/>
```

- Button 은 `style` Props 가 존재하지 않으므로 css 적용 불가
- CSS 적용을 한 버튼은 다른 컴포넌트로 대체(`TouchableOpacity, Pressable`)

## Image

- http 경로로 이미지 출력

```tsx
<Image
  style={{width: 200, height: 200}}
  source={{uri: 'https://picsum.photos/200/300?random=1'}}
/>
```

- local 즉, /assets 폴더에서 이미지 출력하기 : require 사용

```tsx
<Image
  style={{width: 200, height: 200}}
  source={require('../../assets/test.jpg')}
/>
```

- resizeMode : 이미지 채우기
  - cover : 꽉 채우기
  - contain : 이미지가 영역에서 잘려지면 안됨. 너비, 높이 조절
  - center : 이미지 영역에서 잘리지 않고 가운데 정렬
  - repeat : 이미지 반복
  - stretch : 늘려서 채움

```tsx
<Image
  style={{width: 200, height: 200}}
  source={{uri: 'https://picsum.photos/200/300?random=1'}}
  resizeMode="cover"
/>
```

- onError : 이미지 로딩 실패
- onLoadStart : 이미지 로딩 시작
- onLoadEnd : 이미지 로딩 완료

```tsx
<Image
  style={{width: 200, height: 200, borderRadius: 50}}
  source={{uri: 'https://picsum.photos/200/300?random=1'}}
  resizeMode="cover"
  onError={() => Alert.alert('로딩실패')}
  onLoadEnd={() => console.log('이미지로딩완료')}
  onLoadStart={() => console.log('이미지로딩 시작')}
  blurRadius={0}
/>
```

- blurRadius : 블러 이미지 만들기

```tsx
<Image
  style={{width: 200, height: 200}}
  source={{uri: 'https://picsum.photos/200/300?random=1'}}
  resizeMode="cover"
  onError={() => Alert.alert('로딩실패')}
  blurRadius={5}
/>
```

## ScrollView

- 내용이 너무 길어서 한 화면에 다 보여지지 않는 경우 스크롤 활용

```tsx
import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

const AboutScreen = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 100, backgroundColor: 'yellow'}}>
        <ScrollView>
          <Text>내용입니다.</Text>
          <Text>내용입니다.</Text>
          <Text>내용입니다.</Text>
          <Text>내용입니다.</Text>
          <Text>내용입니다.</Text>
          <Text>내용입니다.</Text>
          <Text>내용입니다.</Text>
          <Text>내용입니다.</Text>
        </ScrollView>
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
export default AboutScreen;
```

- horizontal : 가로 스크롤

```tsx
<ScrollView horizontal>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
</ScrollView>
```

- scrollEnabled : 스크롤막기

```tsx
<ScrollView scrollEnabled={false}>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
</ScrollView>
```

- onScroll / scrollEventThrottle(이벤트발생빈도) : 스크롤 이벤트 처리

```tsx
<ScrollView
  onScroll={event => console.log(event.nativeEvent.contentOffset.y)}
  scrollEventThrottle={16}>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
</ScrollView>
```

- contentContainerStyle : 스크롤 안쪽 스타일시트 설정

```tsx
<ScrollView
  contentContainerStyle={{
    padding: 20,
    margin: 20,
    alignItems: 'center',
    backgroundColor: 'skyblue',
  }}>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
  <Text>내용입니다.</Text>
</ScrollView>
```

- refreshControl : 새로 고침 기능

```tsx
import React, {useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AboutScreen = (): JSX.Element => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 100, backgroundColor: 'yellow'}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => setRefreshing(false), 2000);
              }}
            />
          }>
          <Text>아래로 당기면 새로고침 실행</Text>
        </ScrollView>
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
export default AboutScreen;
```

- showsVerticalScrollIndicator : 스크롤바 숨기기

```tsx
showsVerticalScrollIndicator={true}
```

## 버튼말고 `TouchableOpacity`

- Button 은 css 작업이 불가함. (style props가 없어서)
- 다양한 css 용 Button 은 TouchableOpacity 활용

```tsx
<TouchableOpacity onPress={() => Alert.alert('버튼클릭')}>
  <Text>버튼입니다</Text>
</TouchableOpacity>
```

- style, activeOpacity : 스타일 작업

```tsx
<TouchableOpacity
  onPress={() => Alert.alert('버튼클릭')}
  style={{
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 10,
  }}
  activeOpacity={0.8}>
  <Text>버튼입니다</Text>
</TouchableOpacity>
```

- onLongPress : 사용자가 길게 눌렀을 때 처리

```tsx
<TouchableOpacity
  onPress={() => Alert.alert('버튼클릭')}
  onLongPress={() => Alert.alert('버튼 길게 클릭')}>
  <Text>버튼입니다</Text>
</TouchableOpacity>
```

- hitSlop : 터치 영역을 강제로 넓히기

```tsx
<TouchableOpacity
  onPress={() => Alert.alert('버튼클릭')}
  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
  <Text style={{backgroundColor: 'red'}}>버튼입니다</Text>
</TouchableOpacity>
```

- disabled : 비활성화

```tsx
<TouchableOpacity
  disabled={true}
  onPress={() => Alert.alert('버튼클릭')}
  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
  <Text style={{backgroundColor: 'red'}}>버튼입니다</Text>
</TouchableOpacity>
```

## FlatList

- ScrollView 와는 다르게 화면에 보이는 목록만 갱신
- ScrollView 는 전체 데이터를 한번에 랜더링 한다,
- FlatList 는 화면에 보이는 것만 랜더링한다.
- FlatList 가 훨씬 성능이 좋다.
- 많은 목록에서 효율적으로 관리가 가능하다.

- data : 보여줄 데이터 `배열`
- renderItem : `함수`로서 각 아이템의 형태를 지정한다.
- keyExtractor : `함수`로서 각 항목에 고유 키를 지정한다.

```tsx
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  const data = [
    {id: 1, title: '사과'},
    {id: 2, title: '딸기'},
    {id: 3, title: '배'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => <Text>{item.title}</Text>}
          keyExtractor={item => item.id.toString()}
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
export default AboutScreen;
```

- horizontal : 가로 스크롤 옵션

```tsx
<FlatList
  horizontal
  data={data}
  renderItem={({item}) => <Text>{item.title}</Text>}
  keyExtractor={item => item.id.toString()}
/>
```

- ListHeaderComponent,ListFooterComponent, ItemSeparatorComponent, ListEmptyComponent : 구분선, 헤더, 푸터, 자료가 없을 때

```tsx
<FlatList
  data={[]}
  renderItem={({item}) => <Text>{item.title}</Text>}
  keyExtractor={item => item.id.toString()}
  ListHeaderComponent={
    <Text style={{fontSize: 20, backgroundColor: 'red'}}>과일 목록</Text>
  }
  ListFooterComponent={
    <Text style={{fontSize: 20, backgroundColor: 'green'}}>하단</Text>
  }
  ItemSeparatorComponent={() => (
    <View
      style={{
        height: 1,
        backgroundColor: 'blue',
        marginTop: 3,
        marginBottom: 3,
      }}
    />
  )}
  ListEmptyComponent={<Text>데이터가 없습니다.</Text>}
/>
```

- numColumns : 그리드 리스트 : 재 실행하여서 확인 필요

```tsx
<FlatList
  numColumns={2}
  data={data}
  renderItem={({item}) => (
    <View style={{flex: 1, margin: 10}}>
      <Text>{item.title}</Text>
    </View>
  )}
  keyExtractor={item => item.id.toString()}
/>
```

- refreshing, onRefresh : 새로 고침

```tsx
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  const data = [
    {id: 1, title: '사과'},
    {id: 2, title: '딸기'},
    {id: 3, title: '배'},
    {id: 4, title: '참외'},
  ];
  const [refreshing, setRefreshing] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={{flex: 1, margin: 10}}>
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => setRefreshing(false), 2000);
          }}
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
export default AboutScreen;
```

## SafeAreaView

- 화면상의 안전한 공간, 즉 상단 노치, 하단 홈바 등을 제외한 영역에 배치
- SafeAreaView 로 배치되지 않으면 상단, 하단 기본 영역이 겹침
- 옵션은 style

## Alert

```tsx
import React, {useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AboutScreen = (): JSX.Element => {
  const data = [
    {id: 1, title: '사과'},
    {id: 2, title: '딸기'},
    {id: 3, title: '수박'},
    {id: 4, title: '참외'},
  ];
  const [refreshing, setRefreshing] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="버튼"
          onPress={() => {
            Alert.alert('반가워요');
          }}
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

export default AboutScreen;
```

- 기본형식

```tsx
Alert.alert(
  title:string, // 알림 제목
  message?:string,  // 알림 본문(생략가능)
  buttons?: AlertButton[],  //  버튼들의 배열
  options?: AlertOptions  // 추가 설정
)
```

- 일반적인 Alert

```tsx
<Button
  title="버튼"
  onPress={() => {
    Alert.alert('반가워요', '메시지입니다.', [
      {text: '확인', onPress: () => console.log('반가워')},
    ]);
  }}
/>
```

- 일반적인 Alert : 확인, 취소 버튼

```tsx
<Button
  title="버튼"
  onPress={() => {
    Alert.alert('반가워요', '메시지입니다.', [
      {
        text: '등록',
        style: 'destructive',
        onPress: () => console.log('등록 클릭'),
      },
      {
        text: '확인',
        style: 'default',
        onPress: () => console.log('확인 클릭'),
      },
      {
        text: '취소',
        style: 'cancel',
        onPress: () => console.log('취소 클릭'),
      },
    ]);
  }}
/>
```

## Modal : 팝업창

- visible : 팝업창 보기/숨김
  - useState 를 사용해서 조절
- transparent : 투명도
- animationType : 나타나고 사라질 때 효과

```tsx
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AboutScreen = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="버튼"
          onPress={() => {
            Alert.alert('모달창', '모달창 보기 예제입니다', [
              {
                text: 'open',
                style: 'default',
                onPress: () => setIsVisible(true),
              },
            ]);
          }}
        />
      </View>
      <Modal visible={isVisible} transparent={false} animationType="fade">
        <View>
          <Text>안녕하세요</Text>
          <Button title="창 닫기" onPress={() => setIsVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AboutScreen;
```

## StatusBar

- 상단 상태바의 스타일 조정
- ios 에서는 지원 안함
  >
- backgroundColor : 배경색
- barStyle : 아이콘 색상

```tsx
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'skyblue'} barStyle={'default'} />
      <View>
        <Text>About 내용</Text>
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

export default AboutScreen;
```

## Pressable

- 사용자 터치관련 ( Button, TouchableOpacity )
- onPress : 누를 때
- onPressIn : 누르기 시작 시
- onPressOut : 손을 뗄 때
- style : 스타일

```tsx
import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>About 내용</Text>
        <Pressable
          onPress={() => console.log('onPress')}
          onPressIn={() => console.log('onPressIn')}
          onPressOut={() => console.log('onPressOut')}
          style={({pressed}) => ({
            backgroundColor: pressed ? 'red' : 'green',
            padding: 10,
          })}>
          <Text>버튼</Text>
        </Pressable>
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

export default AboutScreen;
```

## ActivityIndicator

- 로딩 컴포넌트
  >
- size : 크기
- color : 색상

```tsx
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AboutScreen = (): JSX.Element => {
  // 로딩 플래그
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    // 클린업 함수
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>About 내용</Text>
        {loading ? (
          <>
            <ActivityIndicator size={'large'} color={'green'} />
            <Text>로딩중...</Text>
          </>
        ) : (
          <Text>로딩완료</Text>
        )}
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

export default AboutScreen;
```

## Switch

- 토글 기능

  >

- value : 현재 useState 의 값 ( true / false )
- onValueChange : 토글이 될 때마다 실행됨
- thumbColor : 버튼 색상
- trackColor : 버튼의 배경 색상

```tsx
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  // 토글에서 관리될 state
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isEnabled ? '#000' : '#fff'},
      ]}>
      <View style={styles.viewContainer}>
        <Text style={[styles.text, {color: isEnabled ? 'white' : 'black'}]}>
          {isEnabled ? '다크모드' : '라이트모드'}
        </Text>
        <Switch
          value={isEnabled}
          onValueChange={val => setIsEnabled(val)}
          thumbColor={'yellow'}
          trackColor={{false: 'gray', true: 'green'}}
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
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
```

## Picker

- 드롭다운 ( 리스트 )
- https://docs.expo.dev/versions/latest/sdk/picker/

```bash
npm i @react-native-picker/picker
```

- selectedValue : 선택한 값
- onValueChange : 값이 바뀔 때 마다 실행
- mode : 스타일
- enabled : 비활성화 여부

- `<Picker.Item label="딸기" value={'strawberry'} />`

```tsx
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const AboutScreen = (): JSX.Element => {
  // 초기 선택된 목록 관련 state
  const [selected, setSelected] = useState('apple');
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>목록에서 선택하시오.</Text>
        <View>
          <Picker
            selectedValue={selected}
            onValueChange={itemValue => setSelected(itemValue)}>
            <Picker.Item label="사과" value={'apple'} />
            <Picker.Item label="딸기" value={'strawberry'} />
            <Picker.Item label="수박" value={'watermelon'} />
            <Picker.Item label="키위" value={'kiwi'} />
          </Picker>
        </View>
        <Text>
          선택한 과일 : <Text style={{color: 'blue'}}>{selected}</Text>
        </Text>
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
export default AboutScreen;
```

# 상식

- `i18n` 에 대한 상식

- 국제화를 의미하는 약어
- 앱이나 웹사이트에서 여러 언어를 지원하기 위한 기술/방식
- Internationalization → I + 18글자 + N = i18n
- react-i18next i18next i18next-browser-languagedetector 등
- react-native-localize (기기 언어 감지용)
