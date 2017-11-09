import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import {
  PADDING_DEFAULT
} from '../helpers/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING_DEFAULT,
  },
});

export default class Event extends Component {
  render() {
    const { event } = this.props;
    const { data } = event;
    return (
      <View style={styles.container}>
        {/* <Timeline
          data={data}
          lineColor={"rgba(255, 255, 255, .25)"}
          circleColor={"#3F53B1"}
          timeStyle={{color:'rgba(255, 255, 255, .75)'}}
          titleStyle={{color: 'rgba(255, 255, 255, .75)'}}
          descriptionStyle={{color:'rgba(255, 255, 255, .55)'}}
          separatorStyle={{backgroundColor: "rgba(255, 255, 255, .25)"}}
        /> */}
        {/* <Progress.Bar progress={0.1} width={200} /> */}
      </View>
    );
  }
}