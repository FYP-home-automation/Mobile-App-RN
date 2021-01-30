import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Text } from 'native-base';
import { fetchAllRooms } from 'HomeAutomation/src/redux/actions';

import { IndoorTracking } from '../constants';
import { CircleStats } from 'HomeAutomation/src/components';
import { Header, LivingSpaces } from 'HomeAutomation/src/containers';
import electricity from 'HomeAutomation/src/assets/electricity.png';
import bill from 'HomeAutomation/src/assets/bill.png';
import { connect } from 'react-redux';

const HomeScreen = ({ navigation, fetchAllRooms, roomList }) => {
  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <View>
      <Header />
      <View style={styles.stats}>
        <Text style={styles.electricityTitle}>
          Electricty and Bill Breakdown
        </Text>

        <CircleStats
          icon={electricity}
          stats="75.3 kwh"
          category="Today - Power Usage"
        />
        <CircleStats
          icon={bill}
          stats="$ 202.13"
          category="This Month Potential Bill"
        />
      </View>
      <LivingSpaces navigation={navigation} roomList={roomList} />
      <View style={styles.usageGraphContainer}>
        <Button
          onPress={() => navigation.navigate(IndoorTracking)}
          style={styles.usageGraphButton}
          title="See Usage Graph"
        >
          <Text style={styles.usageGraphText}>See Indoor Tracking</Text>
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = ({ room }) => ({
  roomList: room.roomList,
});

const mapDispatchToProps = {
  fetchAllRooms,
};

const styles = StyleSheet.create({
  electricityTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 18,
  },
  usageGraphText: {
    fontWeight: '600',
  },
  usageGraphButton: {
    backgroundColor: '#05FFD2',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  usageGraphContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 25,
  },
  stats: {
    paddingTop: 20,
    paddingLeft: 35,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
