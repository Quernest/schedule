import React from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import store from 'react-native-simple-store';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Schedule from '../components/Schedule';
import Calendar from '../components/Calendar';
import ColorConstants from '../constants/Colors';
import { isSameSemester } from '../helpers/helpers';
import { filterEvents } from '../helpers/filters';
import API from '../services/api.service';

const { lightgrey } = ColorConstants;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Расписание',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.object,
      params: PropTypes.object,
    }).isRequired,
  };

  static defaultProp = {
    id: PropTypes.number,
    schedule: PropTypes.object,
  };

  state = {
    selectedDate: moment(),
    group: {},
    schedule: [],
    semesters: [],
    currentSemester: {},
    isLoading: true,
  };

  async componentDidMount() {
    const { id, data } = this.props.navigation.state.params;
    const { selectedDate } = this.state;

    try {
      const data = data || await API.getGroupAllData(id);
      const { semesters, group } = data;
    
      store.save('data', data);

      this.getGroup(group);
      this.getAllSemesters(semesters);
      this.getCurrentSemester(semesters, selectedDate);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  getCurrentSemester(semesters, date) {
    if (semesters && semesters.length > 0) {
      semesters.map((semester) => {
        if (isSameSemester(semester, date)) {
          this.getSchedule(semester, date);

          this.setState({
            currentSemester: semester,
          });
        }
      });
    }
  }

  getSchedule(semester, date) {
    const schedule = filterEvents(semester, date);

    this.setState({
      schedule,
    });
  }

  getGroup(group) {
    this.setState({
      group,
    });
  }

  getAllSemesters(semesters) {
    this.setState({
      semesters,
    });
  }

  stopLoading() {
    this.setState({
      isLoading: false,
    });
  }

  handleDatePress = (date) => {
    const { semesters } = this.state;

    this.getCurrentSemester(semesters, date);

    this.setState({
      selectedDate: date,
    });
  };

  render() {
    const { isLoading, schedule, selectedDate } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Calendar selectedDate={selectedDate} onDatePress={this.handleDatePress} />
          <Schedule events={schedule} date={selectedDate} />
        </View>
      );
    }

    return <Loading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightgrey,
  },
});
