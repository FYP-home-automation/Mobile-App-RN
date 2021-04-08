import React, { useState } from 'react';

import { RoomStatsBar, RoomActiveDevices } from 'HomeAutomation/src/containers';
import {
  capitalize,
  roomTypeImageMapper,
} from 'HomeAutomation/src/utils/global';

import { Button, Icon } from 'native-base';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { FileSystem } from 'expo';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import axios from 'axios';

import { connect } from 'react-redux';

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

const RoomScreen = ({ navigation, activeRoomId, roomList }) => {
  const room = Number.isInteger(activeRoomId) ? roomList[activeRoomId] : null;
  const temp = 24;
  const humidity = 8;
  const brightness = 20;
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const speak = () => {
    const thingToSay = '';
    Speech.speak(thingToSay);
  };

  const getTranscription = async () => {
    // this.setState({ isFetching: true });
    setIsFetching(true);
    console.log('fetching data');
    try {
      const { uri } = await FileSystem.getInfoAsync(recording.getURI());
      // now we create formData which will be sent to our backend
      const formData = new FormData();
      formData.append('file', {
        uri,
        // as different audio types are used for android and ios - we should handle it
        type: Platform.OS === 'ios' ? 'audio/x-wav' : 'audio/m4a',
        name: Platform.OS === 'ios' ? `${Date.now()}.wav` : `${Date.now()}.m4a`,
      });

      formData.append('uri', uri);

      const resp = await axios.post('http://localhost:3005/speech', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const transcription = resp.data;
      console.log('transcription ', transcription);
    } catch (error) {
      console.log('There was an error', error);
    }
    this.setState({ isFetching: false });
  };

  const stopRecording = async () => {
    // set our state to false, so the UI knows that we've stopped the recording
    setIsRecording(false);
    try {
      // stop the recording
      await recording.stopAndUnloadAsync();
    } catch (error) {
      console.log('error', error);
    }
  };

  const startRecording = async () => {
    // request permissions to record audio
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    // if the user doesn't allow us to do so - return as we can't do anything further :(
    if (status !== 'granted') return;
    // when status is granted - setting up our state
    setIsRecording(true);

    // basic settings before we start recording,
    // you can read more about each of them in expo documentation on Audio
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });

    const recording = new Audio.Recording();

    try {
      // here we pass our recording options
      await recording.prepareToRecordAsync(recordingOptions);
      // and finally start the record
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      // we will take a closer look at stopRecording function further in this article
    }

    // if recording was successful we store the result in variable,
    // so we can refer to it from other functions of our component
    setRecording(recording);
  };

  // TODO: dynamic reading for stats, e.g temp, humidity
  // TODO: dynamic devices on/off status
  return (
    <View>
      <ImageBackground
        style={styles.image}
        source={roomTypeImageMapper[room?.room_type]}
      >
        <View style={styles.child}>
          <SafeAreaView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" style={styles.backButtonIcon} />
            </TouchableOpacity>
            <View styles={styles.nameContainer}>
              <Text style={styles.roomName}>{capitalize(room.name)}</Text>
              <Text style={styles.roomType}>
                {room?.room_type !== 'None' ? room.room_type : 'Room'}
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
      <RoomStatsBar temp={temp} humidity={humidity} brightness={brightness} />
      <RoomActiveDevices room={room} activeRoomId={activeRoomId} />
      <Button onPress={() => getTranscription()}>
        <Text>Click Me!</Text>
      </Button>

      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={styles.button}
      >
        <Text style={styles.text}>
          <Text style={styles.text}>
            {isRecording ? 'Recording...' : 'Start recording'}
          </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.alignMic}>
        <View style={styles.micContainer}>
          <Icon style={styles.uploadIcon} name="md-mic" />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({ room }) => ({
  activeRoomId: room.activeRoomId,
  roomList: room.roomList,
});

const styles = StyleSheet.create({
  alignMic: {
    alignItems: 'center',
  },
  micContainer: {
    borderRadius: 50,
    width: 70,
    height: 70,
    backgroundColor: '#ff7a00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomType: {
    color: '#ffff',
    fontWeight: '600',
    fontSize: 15,
    opacity: 0.9,
    textAlign: 'center',
  },
  roomName: {
    color: '#ffff',
    fontWeight: '600',
    fontSize: 23,
    opacity: 0.9,
    textAlign: 'center',
  },
  backButtonIcon: {
    color: '#ffff',
  },
  button: {
    paddingLeft: 20,
  },
  image: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default connect(mapStateToProps, null)(RoomScreen);
