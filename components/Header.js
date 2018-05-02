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
};

export default class Header extends PureComponent<Props> {
  render() {
    const { onUpdate } = this.props;

    return (
      <View style={styles.container}>
        <Grid>
          <Row>
            <Col>
              {/* <Text style={styles.week}>7/8</Text> */}
            </Col>
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
