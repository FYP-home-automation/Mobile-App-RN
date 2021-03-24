import React, { useState } from 'react';
import { Icon, Button } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import Logo from 'HomeAutomation/src/assets/house.png';
import LottieView from 'lottie-react-native';

import { connect } from 'react-redux';

const LoginScreen = ({ navigation }) => {
  const [signInStatus, setSignInStatus] = useState(true);

  // const LoginContainer = () => {
  //   if (signInStatus) {
  //     return (
  //       <View style={styles.loginContainer}>
  //         <TextInput
  //           style={styles.username}
  //           // onChangeText={text => setRoomName(text)}
  //           // value={roomName}
  //           placeholder="username"
  //         />
  //         <TextInput
  //           style={styles.username}
  //           // onChangeText={text => setRoomName(text)}
  //           // value={roomName}
  //           placeholder="password"
  //         />
  //         <View>
  //           <Button style={styles.submitButton} onPress={() => onSubmit()}>
  //             <Text style={styles.submitText}>Sign In</Text>
  //           </Button>
  //         </View>
  //       </View>
  //     );
  //   }
  //   return null;
  // };

  return (
    <View style={styles.container}>
      <Text>tseting</Text>
      {/* <View style={styles.background}>
        <Image style={styles.logo} source={Logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleWithUnderline}>Homely </Text>
          <Text style={styles.title}>your</Text>
        </View>
        <Text style={styles.title}>Smart Home Solution</Text>
      </View>

      <SafeAreaView style={styles.container}>
        <View style={styles.iotAnimation}>
          <LottieView
            source={require('../assets/53665-mesh-network.json')}
            autoPlay
            loop
          />
        </View>
        <View style={styles.menu}>
          <Text
            style={{ ...styles.submenuSignIn(signInStatus), ...styles.submenu }}
            onPress={() => setSignInStatus(true)}
          >
            Sign In
          </Text>
          <Text
            style={{ ...styles.submenuSignUp(signInStatus), ...styles.submenu }}
            onPress={() => setSignInStatus(false)}
          >
            Sign Up
          </Text>
        </View>

        <View style={styles.copyrightContainer}>
          <Text style={styles.footer}>@Copyright 2021</Text>
        </View>
      </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  submenu: {
    marginRight: 8,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#637081',
  },
  submenuSignUp: signInStatus => ({
    textDecorationLine: signInStatus ? 'none' : 'underline',
  }),
  submenuSignIn: signInStatus => ({
    textDecorationLine: signInStatus ? 'underline' : 'none',
  }),
  menu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleWithUnderline: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  copyrightContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  iotAnimation: {
    height: 185,
    display: 'flex',
  },
  background: {
    backgroundColor: '#05FFD2',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    height: 40,
    borderColor: '#C8C8C8',
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 2,
    padding: 10,
    marginBottom: 17,
  },
  loginContainer: {
    alignItems: 'center',
    // marginTop: 70,
    display: 'flex',
  },
  submitButton: {
    backgroundColor: '#05FFD2',
    marginTop: 10,
  },
  submitText: {
    padding: 10,
    fontWeight: '400',
  },
  footer: {
    color: '#C8C8C8',
  },
});

export default connect(mapStateToProps, null)(LoginScreen);
