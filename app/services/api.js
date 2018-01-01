import axios from 'axios';

const url = 'https://schedule-admin.herokuapp.com/api';

export default class API {
  static get(type, ...params) {
    return axios.get(`${url}/${type}/${params}`);
  }
}
