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
            onValueChange={itemValue => setSelected(itemValue)}
            mode="dialog">
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
