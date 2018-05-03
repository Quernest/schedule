// @flow

import store from 'react-native-simple-store';
import fetchPonyfill from 'fetch-ponyfill';

const { fetch } = fetchPonyfill();

const API_URL: string = 'http://schedule-admin.herokuapp.com/api';

const getRequest = async (url: string): ?Object => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return Promise.reject(new Error('Server connection error'));
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error) {
      return error;
    }
  }

  return {};
};

class API {
  static getGroups(): ?Object {
    const url: string = `${API_URL}/groups`;

    return getRequest(url);
  }

  static getGroupAllData(id: number): ?Object {
    const url: string = `${API_URL}/group/${id}/alldata`;

    return getRequest(url);
  }
}

export default API;
