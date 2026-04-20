import { createInstance } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

import { appI18nStore } from "@/store/app-store";
import { useAppStore } from "@/store";

import {
  detectDeviceLocale,
  getLocaleDirection,
  isRTLLocale,
  isSupportedLocale,
  type Locale,
} from "./locale";
import { ar, en, tr } from "./translations";

const resources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
} as const;

const i18n = createInstance();

function resolveInitialLocale(): Locale {
  const override = appI18nStore.getState().localeOverride;

  if (override && isSupportedLocale(override)) {
    return override;
  }

  return detectDeviceLocale();
}

void i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: resolveInitialLocale(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

appI18nStore.subscribe((state, previousState) => {
  if (state.localeOverride !== previousState.localeOverride) {
    void i18n.changeLanguage(state.localeOverride ?? detectDeviceLocale());
  }
});

export { i18n };
export type { Locale } from "./locale";
export {
  detectDeviceLocale,
  getLocaleDirection,
  isRTLLocale,
  isSupportedLocale,
} from "./locale";
export function useAppTranslation() {
  return useTranslation();
}

export function useLocaleSettings() {
  const locale = useAppStore((state) => state.resolvedLocale);
  const isRTL = isRTLLocale(locale);

  return {
    locale,
    direction: getLocaleDirection(locale),
    isRTL,
  };
}
