import React, { useState } from 'react';

import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { SetupTab, TrackingTab } from 'HomeAutomation/src/containers';

const initialLayout = { width: Dimensions.get('window').width };

const IndoorTrackingScreen = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Setup', title: 'Setup' },
    { key: 'Tracking', title: 'Tracking' },
  ]);

  const renderScene = SceneMap({
    Setup: SetupTab,
    Tracking: TrackingTab,
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
    <View style={{ display: 'flex' }}>
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
    height: '100%',
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
