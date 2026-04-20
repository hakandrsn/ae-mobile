export const colors = {
  brand: {
    50: "#F2F7F4",
    100: "#D9EADF",
    200: "#B2D5BE",
    300: "#84B898",
    400: "#5E9E76",
    500: "#3F7F5A",
    600: "#2C6546",
    700: "#214F37",
    800: "#173627",
    900: "#0E2017",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#F6F7F8",
    100: "#E8EAED",
    200: "#D6DADE",
    300: "#B7BEC6",
    400: "#8C96A0",
    500: "#66717D",
    600: "#4A5561",
    700: "#35404C",
    800: "#232C35",
    900: "#12181E",
  },
  success: "#2E8B57",
  warning: "#D98E04",
  danger: "#C44444",
  info: "#2563EB",
} as const;

export const spacing = {
  none: 0,
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const typography = {
  fontFamily: {
    regular: "System",
    medium: "System",
    semibold: "System",
    bold: "System",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    display: 36,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    display: 42,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: "#12181E",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  md: {
    shadowColor: "#12181E",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 4,
  },
} as const;

export const lightTheme = {
  id: "light",
  colors: {
    background: colors.neutral[50],
    surface: colors.neutral[0],
    surfaceMuted: colors.brand[50],
    text: colors.neutral[900],
    textMuted: colors.neutral[600],
    border: colors.neutral[200],
    primary: colors.brand[600],
    primaryForeground: colors.neutral[0],
    accent: colors.brand[100],
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    info: colors.info,
  },
  spacing,
  radius,
  typography,
  shadows,
} as const;

export const darkTheme = {
  id: "dark",
  colors: {
    background: colors.neutral[900],
    surface: colors.neutral[800],
    surfaceMuted: colors.neutral[700],
    text: colors.neutral[0],
    textMuted: colors.neutral[300],
    border: colors.neutral[700],
    primary: colors.brand[300],
    primaryForeground: colors.neutral[900],
    accent: colors.brand[800],
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    info: colors.info,
  },
  spacing,
  radius,
  typography,
  shadows,
} as const;

export type AppTheme = typeof lightTheme | typeof darkTheme;
export type ThemePreference = AppTheme["id"];
