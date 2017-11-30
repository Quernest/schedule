const url = 'https://raw.githubusercontent.com/Quernest/Schedule/master/API/it-14-1.json';

class API {
  static getData() {
    return fetch(url).then(res => res.json());
  }
}

export default API;
