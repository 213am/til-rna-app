import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  createTodo,
  deleteTodo,
  getTodos,
  TodosRow,
  updateTodo,
} from '../api/todos-api';

const HomeScreen = ({navigation}: {navigation: any}): JSX.Element => {
  // 전체 목록 state
  const [todos, setTodos] = useState<TodosRow[]>([]);
  // 수정 관련 state
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  // 새글 관련 state
  const [newTitle, setNewTitle] = useState('');

  // 전체 목록 가져오기
  const fetchGetTodos = async () => {
    const result = await getTodos();

    if (!result) {
      console.log('데이터 호출 실패');
      return;
    }

    const {data, error, status} = result;
    if (error) {
      console.log('오류 발생 : ', error.message);
      return;
    }
    if (data) {
      console.log(status);
      setTodos(data);
    }
  };

  // 목록 삭제하기
  const handleDelete = async (id: number) => {
    const {data, error} = await deleteTodo(id);
    // 전체 목록 다시 불러오기
    fetchGetTodos();
  };

  // 목록 수정하기
  const handleEdit = async (id: number) => {
    if (editTitle.trim() === '') {
      Alert.alert('제목을 입력하세요.');
      return;
    }
    const {data, error, status} = await updateTodo(id, editTitle);
    console.log(data);
    setEditId(null);
    setEditTitle('');
    Alert.alert('제목이 수정되었습니다.');
    fetchGetTodos();
  };

  // 새 글 추가하기
  const handleAdd = async () => {
    if (newTitle.trim() === '') {
      Alert.alert('제목을 입력하세요.');
      return;
    }
    const result = await createTodo(newTitle);
    if (!result) {
      Alert.alert('새 글 등록에 실패했습니다');
      return;
    }
    const {data, error, status} = result;
    console.log(data);
    setNewTitle('');
    fetchGetTodos();
  };

  useEffect(() => {
    fetchGetTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.routerButtons}>
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
      {/* 추가 */}
      <View style={[styles.inputArea, {marginTop: 20}]}>
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <Button title="추가" color={'#0b72e0'} onPress={handleAdd} />
      </View>
      {/* 목록 */}
      <ScrollView style={styles.todoList}>
        {todos.map(item => (
          <View key={item.id} style={styles.todoCard}>
            {editId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editTitle}
                  onChangeText={setEditTitle}
                />
                <View style={styles.todoButtons}>
                  <Button
                    title="저장"
                    color={'skyblue'}
                    onPress={() => handleEdit(item.id)}
                  />
                  <Button
                    title="취소"
                    color={'gray'}
                    onPress={() => {
                      setEditId(null);
                      setEditTitle('');
                    }}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.todoTitle}>
                  {item.title ? item.title : 'No title'}
                </Text>
                <View style={styles.todoButtons}>
                  <Button
                    title="수정"
                    color={'#4caf50'}
                    onPress={() => {
                      setEditId(item.id);
                      setEditTitle(item.title || '');
                    }}
                  />
                  <Button
                    title="삭제"
                    color={'#f44336'}
                    onPress={() => handleDelete(item.id)}
                  />
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  routerButtons: {
    gap: 10,
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  todoList: {
    flex: 1,
    marginTop: 20,
  },
  todoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
