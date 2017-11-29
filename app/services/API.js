class API {
  static getData() {
    return fetch('https://raw.githubusercontent.com/Quernest/Schedule/master/API/it-14-1.json');
  }
}

export default API;