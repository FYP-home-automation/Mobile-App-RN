import React from 'react';

import { connect } from 'react-redux';
import { setNumber } from '../redux/actions/roomAction';
import { IndoorTrackingHeader } from 'HomeAutomation/src/containers';
import { Text, View, Button } from 'react-native';

const IndoorTrackingScreen = ({ onClick, number, navigation }) => {
  return (
    <View>
      <IndoorTrackingHeader navigation={navigation}></IndoorTrackingHeader>
    </View>
  );
};

const mapStateToProps = (state, ownProps) => ({
  number: state.sample.count,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: count => dispatch(setNumber(count)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndoorTrackingScreen);
