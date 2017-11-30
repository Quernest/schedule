class API {
  static getData(id) {
    return fetch(`https://raw.githubusercontent.com/Quernest/Schedule/master/API/it-14-${id}.json`).then(res => res.json());
  }
}

export default API;
