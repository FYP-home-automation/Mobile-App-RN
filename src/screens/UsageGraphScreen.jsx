import React from 'react';

import { connect } from 'react-redux';
import { setNumber } from '../redux/actions/roomAction';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Layer } from 'devextreme-react/vector-map';

const UsageGraphScreen = ({ onClick, number }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Usage Graph Screen testing</Text>
      <Button title="testing" onPress={() => onClick(number + 1)}></Button>
      <Text>{number}</Text>
    </View>
  );
};

const mapStateToProps = (state, ownProps) => ({
  number: state.sample.count,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: count => dispatch(setNumber(count)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsageGraphScreen);
