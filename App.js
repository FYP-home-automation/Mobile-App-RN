import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {
  HomeScreen,
  RoomScreen,
  UsageGraphScreen,
} from 'HomeAutomation/src/screens';
import { Home, Room, UsageGraph } from 'HomeAutomation/src/constants';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './src/redux/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Kevin Tirta',
  hostname: 'localhost',
  port: 8000, // the port your remotedev server is running at
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
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
          initialRouteName={Home}
        >
          <Stack.Screen name={Home} component={HomeScreen} />
          <Stack.Screen name={Room} component={RoomScreen} />
          <Stack.Screen name={UsageGraph} component={UsageGraphScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
