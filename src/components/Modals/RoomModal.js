import React, { useState } from 'react';

import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

const defaultRoom = 'Living Room';

const RoomModal = ({ modalVisible, onClose }) => {
  const [roomName, setRoomName] = useState(null);
  const [chosenRoom, setChosenRoom] = useState(defaultRoom);

  const pressSubmit = () => {
    setRoomName(null);
    setChosenRoom(defaultRoom);
    onClose(!modalVisible);
  };

  const pressCancel = () => {
    setRoomName(null);
    setChosenRoom(defaultRoom);
    onClose(!modalVisible);
  };

  const roomOptions = [
    {
      label: 'Living Room',
      value: 'Living Room',
    },
    {
      label: 'Kitchen',
      value: 'Kitchen',
    },
    {
      label: 'Bedroom',
      value: 'Bedroom',
    },
    {
      label: 'Others',
      value: 'Others',
    },
  ];

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Room</Text>
            <View style={styles.optionContainer}>
              <Text style={styles.modalOptionTitle}>Room Name</Text>
              <TextInput
                style={styles.roomName}
                onChangeText={text => setRoomName(text)}
                value={roomName}
                placeholder="input name"
              />
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.modalOptionTitle}>Room Type</Text>
              <DropDownPicker
                items={roomOptions}
                defaultValue={chosenRoom}
                containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownItem}
                labelStyle={styles.dropdownLabel}
                onChangeItem={item => setChosenRoom(item.value)}
              />
            </View>

            <View style={styles.buttonGroup}>
              <TouchableHighlight
                style={{ ...styles.button, ...styles.cancelButton }}
                onPress={() => pressCancel()}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.button, ...styles.submitButton }}
                onPress={() => pressSubmit()}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    height: 40,
    width: 125,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#000',
  },
  optionContainer: {
    marginBottom: 22,
    zIndex: 1,
  },
  roomName: {
    height: 40,
    borderColor: '#C8C8C8',
    width: 120,
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 2,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: '#D11A2A',
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    marginLeft: 5,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
  },
  button: {
    borderRadius: 12,
    padding: 10,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOptionTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default RoomModal;
