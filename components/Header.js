// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Col,
  Row,
  Grid,
} from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onUpdate: () => void,
  weeks?: {
    total: number,
    current: number,
    currentWeekType: number,
  },
};

export default class Header extends PureComponent<Props> {
  render() {
    const { onUpdate, weeks } = this.props;

    const isVisibleWeeks = Object.keys(weeks || {}).length > 0;

    return (
      <View style={styles.container}>
        <Grid>
          <Row>
            {isVisibleWeeks && (
              <Col>
                <Text style={styles.week}>
                  {weeks.current} / {weeks.total}
                </Text>
              </Col>
            )}
            <Col>
              <TouchableOpacity onPress={onUpdate}>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
                  size={32}
                  style={styles.update}
                />
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 42,
    paddingHorizontal: 7.5,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    backgroundColor: '#38498c',
  },
  update: {
    marginLeft: 'auto',
    color: '#f9ffff',
  },
  week: {
    color: '#f9ffff',
  },
});
