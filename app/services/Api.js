class API {
  static getJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('get', url);
      xhr.responseType = 'json';
      xhr.onload = () => {
        const { status } = xhr;

        if (status === 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  }
  static getAllGroups() {
    return this.getJSON('https://schedule-admin.herokuapp.com/api/groups');
  }
}

export default API;
