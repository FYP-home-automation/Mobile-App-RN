import React from 'react';

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={{ ...styles.welcome, ...styles.welcomeName }}>
          Hello Karuna,
        </Text>
        <Text style={styles.welcome}>I am Homely</Text>
        <Text style={styles.welcome}>your Smart Home System</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: '#05FFD2',
    justifyContent: 'center',
    paddingTop: 20,
  },
  welcome: {
    fontWeight: '600',
    paddingLeft: '10%',
    paddingTop: 2,
  },
  welcomeName: {
    fontSize: 19,
  },
});

export default Header;
