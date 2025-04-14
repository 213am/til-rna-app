import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const DetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>상세화면입니다.</Text>
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
