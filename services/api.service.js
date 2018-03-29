import store from 'react-native-simple-store';

const API_URL = 'https://schedule-admin.herokuapp.com/api';

const getRequest = async (url) => {
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
};

class API {
  static getGroups() {
    const url = `${API_URL}/groups`;

    return getRequest(url);
  }

  static getGroupAllData(id, isUseStore = false) {
    const url = `${API_URL}/group/${id}/alldata`;

    if (!isUseStore && id) {
      return getRequest(url);
    }

    return store.get('data');
  }
}

export default API;

// const getRequest = url =>
//   fetch(url)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//
//       throw new Error('Network response was not ok');
//     })
//     .then((json) => {
//       if (json) {
//         return json;
//       }
//
//       throw new Error('Parsing json error');
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//
// class API {
//   static getGroups() {
//     const url = `${API_URL}/groups`;
//
//     return getRequest(url);
//   }
//
//   static getGroupAllData(id) {
//     if (typeof id === 'number' && Number.isInteger(id)) {
//       const url = `${API_URL}/group/${id}/alldata`;
//
//       return getRequest(url);
//     }
//
//     return store.get('schedule');
//   }
// }
//
// export default API;
