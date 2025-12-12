const defaultLocale = {
  countryCode: 'US',
  languageTag: 'en-US',
  languageCode: 'en',
  isRTL: false,
};

module.exports = {
  getLocales: () => [defaultLocale],
  getCountry: () => defaultLocale.countryCode,
  getNumberFormatSettings: () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  }),
  getCalendar: () => 'gregorian',
  getTemperatureUnit: () => 'celsius',
  getTimeZone: () => 'UTC',
  uses24HourClock: () => true,
  usesMetricSystem: () => true,
  usesAutoDateAndTime: () => true,
  usesAutoTimeZone: () => true,
  findBestAvailableLanguage: () => ({
    languageTag: defaultLocale.languageTag,
    isRTL: defaultLocale.isRTL,
  }),
};
