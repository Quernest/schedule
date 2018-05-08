import i18n from 'i18next';
import Expo from 'expo';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector

const languageDetector = {
  type: 'languageDetector',
  async: true, // async detection
  detect: (cb) => {
    return Expo.Util.getCurrentLocaleAsync()
      .then(lng => cb(lng));
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

const config = {
  fallbackLng: 'en',
  resources: {
    en: require('./translations/en.json'),
    ru: require('./translations/ru.json'),
    uk: require('./translations/uk.json'),
  },
  // have a initial namespace
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false, // not needed for react
  },
};

export default i18n.use(languageDetector).init(config);
