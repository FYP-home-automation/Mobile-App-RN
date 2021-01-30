import React, { useState } from 'react';

import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const SetupTab = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <Text>testing</Text>
  </View>
);

const Tracking = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <Text>testing</Text>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const IndoorTrackingScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Setup', title: 'Setup' },
    { key: 'Location', title: 'Tracking' },
  ]);

  const renderScene = SceneMap({
    Setup: SetupTab,
    Location: Tracking,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black' }}
      style={{ backgroundColor: '#05FFD2' }}
      renderLabel={({ route }) => (
        <Text style={{ color: 'black' }}>{route.title}</Text>
      )}
    />
  );

  return (
    <View>
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
      <View style={styles.tabViewContainer}>
        <TabView
          style={styles.tabView}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

export default IndoorTrackingScreen;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabViewContainer: {
    height: 1000,
  },
  backButtonContainer: {
    width: 55,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    backgroundColor: '#05FFD2',
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
