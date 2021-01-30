import React from 'react';

import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';

const IndoorTrackingHeader = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.mainMenu}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={styles.backButtonIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Indoor Tracking</Text>
        <View style={styles.controlGroup}>
          <Icon style={styles.controlGroupIcon} name="md-refresh" />
          <Icon style={styles.controlGroupIcon} name="ios-trash" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default IndoorTrackingHeader;

const styles = StyleSheet.create({
  backButtonContainer: {
    width: 55,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    backgroundColor: '#05FFD2',
    height: 150,
  },
  mainMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  backButtonIcon: {},
  controlGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: 55,
  },
  controlGroupIcon: {
    padding: 6,
    fontSize: 28,
  },
});
