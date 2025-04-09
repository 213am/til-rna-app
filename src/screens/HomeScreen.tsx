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
