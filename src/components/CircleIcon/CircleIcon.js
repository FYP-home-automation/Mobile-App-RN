import React from 'react';

import { StyleSheet, Image, View } from 'react-native';

const CircleIcon = ({ icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image style={styles.image} source={icon}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  circle: {
    height: 75,
    width: 75,
    backgroundColor: '#05FFD2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default CircleIcon;
