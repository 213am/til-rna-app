import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const AboutScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text> About Screen</Text>
      </View>
    </SafeAreaView>
  );
};

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});

export default AboutScreen;
