import { getLocales } from 'react-native-localize';

export function getAcceptLanguage(): string {
  const locales = getLocales();
  return locales[0]?.languageCode || 'en';
}
