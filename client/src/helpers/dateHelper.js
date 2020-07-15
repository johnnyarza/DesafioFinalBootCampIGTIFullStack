export default {
  getLocalDateNow(locale = 'sv-SE') {
    let localDateNow = new Date();
    localDateNow = localDateNow.toLocaleDateString(locale);
    return localDateNow;
  },
};
