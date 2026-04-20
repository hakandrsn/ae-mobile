export const en = {
  common: {
    continue: "Continue",
    foundation: "Foundation",
    language: "Language",
    direction: "Direction",
    theme: "Theme",
  },
  home: {
    badge: "Base Version",
    title: "Reusable Expo foundation",
    description:
      "This project is set up to unify theme, shared components, i18n, routing, and data layers under a reusable standard.",
    architectureTitle: "Architecture Principles",
    architectureItems: [
      "Feature-first structure with shared primitives",
      "Token-driven theme system",
      "Single provider entry point",
      "A lean scaffold that works before package installs",
    ],
    nextTitle: "Next Step",
    nextDescription:
      "In the next step, we will add data, state, and i18n packages in a controlled way and connect this scaffold to real integrations.",
  },
  settings: {
    languageSectionTitle: "Language Switcher",
    languageDescription:
      "You can switch languages here to test the shared i18n and RTL-aware foundation.",
    themeSectionTitle: "Theme Toggle",
    themeDescription: "You can switch the current theme using this button.",
    localeStatus: "Current locale: {{locale}}",
    directionStatus: "Current direction: {{direction}}",
    rtlHint:
      "When Arabic is selected, shared components should respond to RTL. Full native RTL mirroring may require rebuilding the dev app after app config changes.",
    switchToLight: "Switch To Light Theme",
    switchToDark: "Switch To Dark Theme",
    languageNames: {
      en: "English",
      tr: "Turkish",
      ar: "Arabic",
    },
  },
} as const;
