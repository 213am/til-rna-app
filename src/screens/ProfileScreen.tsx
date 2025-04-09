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
          activeOpacity={0.8}
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
