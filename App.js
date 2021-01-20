import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';

import {
  HomeScreen,
  RoomScreen,
  UsageGraphScreen,
} from 'HomeAutomation/src/screens';
import { Home, Room, UsageGraph } from 'HomeAutomation/src/constants';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './src/redux/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// console.log('Constants ', Constants);
const ipMatch = Constants.manifest.hostUri.match(/([0-9.]+):/)[1];
console.log('ipMatch ', ipMatch);
console.log('ipMatch test ', ipMatch[1]);

// const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));
const composeEnhancers = composeWithDevTools({
  // hostname: `${ipMatch ? ipMatch[1] : 'localhost'}:5678`,
  // hostname: `${ipMatch}:5678`,
  realtime: true,
  name: 'Kevin Tirta',
  hostname: 'localhost',
  // hostname: `${ipMatch ? ipMatch[1] : 'localhost'}:8000`,
  port: 8000, // the port your remotedev server is running at
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  // (applyMiddleware(thunk))
  // applyMiddleware(thunk),
  // composeWithDevTools({
  //   hostname: `${ipMatch ? ipMatch[1] : 'localhost'}:5678`,
  // })
);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={UsageGraph}
        >
          <Stack.Screen name={Home} component={HomeScreen} />
          <Stack.Screen name={Room} component={RoomScreen} />
          <Stack.Screen name={UsageGraph} component={UsageGraphScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
