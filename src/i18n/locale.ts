import { getLocales } from 'expo-localization';

const supportedLocales = ['en', 'tr', 'ar'] as const;
const rtlLocales = ['ar'] as const;

export type Locale = (typeof supportedLocales)[number];
export type LocaleDirection = 'ltr' | 'rtl';

export function isSupportedLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function isRTLLocale(locale: Locale) {
  return rtlLocales.includes(locale as (typeof rtlLocales)[number]);
}

export function getLocaleDirection(locale: Locale): LocaleDirection {
  return isRTLLocale(locale) ? 'rtl' : 'ltr';
}

export function detectDeviceLocale(): Locale {
  const localeTag = getLocales()[0]?.languageCode?.toLowerCase() ?? 'en';

  if (isSupportedLocale(localeTag)) {
    return localeTag;
  }

  return 'en';
}

export function detectDeviceDirection(): LocaleDirection {
  return getLocaleDirection(detectDeviceLocale());
}
