import { APP_TEXT_FONT_FAMILY } from '@/core/fonts/app-fonts';

export const colors = {
  brand: {
    50: '#F2F7F4',
    100: '#D9EADF',
    200: '#B2D5BE',
    300: '#84B898',
    400: '#5E9E76',
    500: '#3F7F5A',
    600: '#2C6546',
    700: '#214F37',
    800: '#173627',
    900: '#0E2017',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F6F7F8',
    100: '#E8EAED',
    200: '#D6DADE',
    300: '#B7BEC6',
    400: '#8C96A0',
    500: '#66717D',
    600: '#4A5561',
    700: '#35404C',
    800: '#232C35',
    900: '#12181E',
  },
  app: {
    canvas: '#F8F9FA',
    text: '#1F2937',
    textMuted: '#6B7280',
    midnight: '#0F172A',
    emerald: '#10B981',
    surface: '#FFFFFF',
    borderSubtle: '#E5E7EB',
  },
  success: '#2E8B57',
  warning: '#D98E04',
  danger: '#C44444',
  info: '#2563EB',
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
    regular: APP_TEXT_FONT_FAMILY,
    medium: APP_TEXT_FONT_FAMILY,
    semibold: APP_TEXT_FONT_FAMILY,
    bold: APP_TEXT_FONT_FAMILY,
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
    shadowColor: '#12181E',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  md: {
    shadowColor: '#12181E',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 4,
  },
} as const;

const lightButton = {
  chip: {
    iconSize: { md: 16, sm: 14 } as const,
    radius: radius.full,
    variants: {
      category: {
        default: {
          backgroundColor: colors.app.surface,
          borderColor: colors.app.borderSubtle,
          borderWidth: 1,
          iconColor: colors.app.textMuted,
          textColor: colors.app.text,
        },
        selected: {
          backgroundColor: `${colors.app.midnight}12`,
          borderColor: colors.app.midnight,
          borderWidth: 1,
          iconColor: colors.app.midnight,
          textColor: colors.app.midnight,
        },
      },
      filter: {
        default: {
          backgroundColor: colors.neutral[50],
          borderColor: colors.app.borderSubtle,
          borderWidth: 1,
          iconColor: colors.app.textMuted,
          textColor: colors.app.text,
        },
        selected: {
          backgroundColor: colors.app.midnight,
          borderColor: colors.app.midnight,
          borderWidth: 1,
          iconColor: colors.neutral[0],
          textColor: colors.neutral[0],
        },
      },
      tag: {
        default: {
          backgroundColor: colors.app.surface,
          borderColor: colors.app.borderSubtle,
          borderWidth: 1,
          iconColor: colors.app.textMuted,
          textColor: colors.app.textMuted,
        },
        selected: {
          backgroundColor: colors.neutral[100],
          borderColor: colors.neutral[300],
          borderWidth: 1,
          iconColor: colors.app.text,
          textColor: colors.app.text,
        },
      },
    },
  },
  common: {
    disabledOpacity: 0.45,
    pressedOpacity: 0.88,
  },
  cta: {
    radius: radius.md,
    sizes: {
      lg: { gap: 10, iconSize: 22, minHeight: 52, paddingHorizontal: 20, paddingVertical: 12 },
      md: { gap: 8, iconSize: 20, minHeight: 44, paddingHorizontal: 16, paddingVertical: 10 },
      sm: { gap: 6, iconSize: 18, minHeight: 36, paddingHorizontal: 12, paddingVertical: 8 },
    },
    variants: {
      destructive: {
        backgroundColor: colors.danger,
        borderColor: colors.danger,
        borderWidth: 0,
        iconColor: colors.neutral[0],
        textColor: colors.neutral[0],
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        iconColor: colors.app.midnight,
        textColor: colors.app.midnight,
      },
      positive: {
        backgroundColor: colors.app.emerald,
        borderColor: colors.app.emerald,
        borderWidth: 0,
        iconColor: colors.neutral[0],
        textColor: colors.neutral[0],
      },
      primary: {
        backgroundColor: colors.app.midnight,
        borderColor: colors.app.midnight,
        borderWidth: 0,
        iconColor: colors.neutral[0],
        textColor: colors.neutral[0],
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: colors.app.midnight,
        borderWidth: 1.5,
        iconColor: colors.app.midnight,
        textColor: colors.app.midnight,
      },
      surface: {
        backgroundColor: colors.app.surface,
        borderColor: colors.app.borderSubtle,
        borderWidth: 1,
        iconColor: colors.app.midnight,
        textColor: colors.app.text,
      },
    },
  },
  disabled: {
    backgroundColor: colors.neutral[200],
    borderColor: 'transparent',
    borderWidth: 0,
    iconColor: colors.neutral[500],
    textColor: colors.neutral[500],
  },
  icon: {
    radius: radius.md,
    selected: {
      backgroundColor: `${colors.app.midnight}18`,
      borderColor: colors.app.midnight,
      borderWidth: 1.5,
      iconColor: colors.app.midnight,
    },
    sizes: {
      lg: { iconSize: 24, size: 52 },
      md: { iconSize: 22, size: 44 },
      sm: { iconSize: 18, size: 36 },
    },
    variants: {
      destructive: {
        backgroundColor: `${colors.danger}18`,
        borderColor: 'transparent',
        borderWidth: 0,
        iconColor: colors.danger,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        iconColor: colors.app.midnight,
      },
      primary: {
        backgroundColor: colors.app.midnight,
        borderColor: colors.app.midnight,
        borderWidth: 0,
        iconColor: colors.neutral[0],
      },
      surface: {
        backgroundColor: colors.app.surface,
        borderColor: colors.app.borderSubtle,
        borderWidth: 1,
        iconColor: colors.app.midnight,
      },
    },
  },
  tab: {
    badge: {
      backgroundColor: colors.danger,
    },
    radius: radius.md,
    sizes: {
      md: { iconSize: 20, minHeight: 40, paddingHorizontal: 14, paddingVertical: 8 },
      sm: { iconSize: 18, minHeight: 34, paddingHorizontal: 10, paddingVertical: 6 },
    },
    variants: {
      default: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        iconColor: colors.app.textMuted,
        textColor: colors.app.textMuted,
      },
      selected: {
        backgroundColor: colors.app.surface,
        borderColor: colors.app.midnight,
        borderWidth: 1.5,
        iconColor: colors.app.midnight,
        textColor: colors.app.midnight,
      },
    },
  },
} as const;

const darkSemantic = {
  canvas: '#0B1220',
  text: '#F3F4F6',
  textMuted: '#9CA3AF',
  midnight: '#E2E8F0',
  emerald: '#10B981',
  surface: '#1E293B',
  borderSubtle: '#334155',
} as const;

const darkButton = {
  chip: {
    iconSize: { md: 16, sm: 14 } as const,
    radius: radius.full,
    variants: {
      category: {
        default: {
          backgroundColor: darkSemantic.surface,
          borderColor: darkSemantic.borderSubtle,
          borderWidth: 1,
          iconColor: darkSemantic.textMuted,
          textColor: darkSemantic.text,
        },
        selected: {
          backgroundColor: `${darkSemantic.midnight}22`,
          borderColor: darkSemantic.midnight,
          borderWidth: 1,
          iconColor: darkSemantic.midnight,
          textColor: darkSemantic.midnight,
        },
      },
      filter: {
        default: {
          backgroundColor: colors.neutral[800],
          borderColor: darkSemantic.borderSubtle,
          borderWidth: 1,
          iconColor: darkSemantic.textMuted,
          textColor: darkSemantic.text,
        },
        selected: {
          backgroundColor: colors.neutral[0],
          borderColor: colors.neutral[0],
          borderWidth: 1,
          iconColor: colors.neutral[900],
          textColor: colors.neutral[900],
        },
      },
      tag: {
        default: {
          backgroundColor: darkSemantic.surface,
          borderColor: darkSemantic.borderSubtle,
          borderWidth: 1,
          iconColor: darkSemantic.textMuted,
          textColor: darkSemantic.textMuted,
        },
        selected: {
          backgroundColor: colors.neutral[700],
          borderColor: colors.neutral[500],
          borderWidth: 1,
          iconColor: darkSemantic.text,
          textColor: darkSemantic.text,
        },
      },
    },
  },
  common: lightButton.common,
  cta: {
    radius: radius.md,
    sizes: lightButton.cta.sizes,
    variants: {
      destructive: {
        backgroundColor: colors.danger,
        borderColor: colors.danger,
        borderWidth: 0,
        iconColor: colors.neutral[0],
        textColor: colors.neutral[0],
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        iconColor: darkSemantic.midnight,
        textColor: darkSemantic.midnight,
      },
      positive: {
        backgroundColor: darkSemantic.emerald,
        borderColor: darkSemantic.emerald,
        borderWidth: 0,
        iconColor: colors.neutral[0],
        textColor: colors.neutral[0],
      },
      primary: {
        backgroundColor: colors.neutral[0],
        borderColor: colors.neutral[0],
        borderWidth: 0,
        iconColor: colors.neutral[900],
        textColor: colors.neutral[900],
      },
      secondary: {
        backgroundColor: 'transparent',
        borderColor: darkSemantic.midnight,
        borderWidth: 1.5,
        iconColor: darkSemantic.midnight,
        textColor: darkSemantic.midnight,
      },
      surface: {
        backgroundColor: darkSemantic.surface,
        borderColor: darkSemantic.borderSubtle,
        borderWidth: 1,
        iconColor: darkSemantic.midnight,
        textColor: darkSemantic.text,
      },
    },
  },
  disabled: {
    backgroundColor: colors.neutral[700],
    borderColor: 'transparent',
    borderWidth: 0,
    iconColor: colors.neutral[400],
    textColor: colors.neutral[400],
  },
  icon: {
    radius: radius.md,
    selected: {
      backgroundColor: `${colors.neutral[0]}22`,
      borderColor: darkSemantic.midnight,
      borderWidth: 1.5,
      iconColor: darkSemantic.midnight,
    },
    sizes: lightButton.icon.sizes,
    variants: {
      destructive: {
        backgroundColor: `${colors.danger}33`,
        borderColor: 'transparent',
        borderWidth: 0,
        iconColor: '#FCA5A5',
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        iconColor: darkSemantic.midnight,
      },
      primary: {
        backgroundColor: colors.neutral[0],
        borderColor: colors.neutral[0],
        borderWidth: 0,
        iconColor: colors.neutral[900],
      },
      surface: {
        backgroundColor: darkSemantic.surface,
        borderColor: darkSemantic.borderSubtle,
        borderWidth: 1,
        iconColor: darkSemantic.midnight,
      },
    },
  },
  tab: {
    badge: {
      backgroundColor: colors.danger,
    },
    radius: radius.md,
    sizes: lightButton.tab.sizes,
    variants: {
      default: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        iconColor: darkSemantic.textMuted,
        textColor: darkSemantic.textMuted,
      },
      selected: {
        backgroundColor: darkSemantic.surface,
        borderColor: darkSemantic.midnight,
        borderWidth: 1.5,
        iconColor: darkSemantic.midnight,
        textColor: darkSemantic.midnight,
      },
    },
  },
} as const;

export const lightTheme = {
  id: 'light',
  button: lightButton,
  colors: {
    accent: `${colors.app.midnight}14`,
    background: colors.app.canvas,
    border: colors.app.borderSubtle,
    danger: colors.danger,
    dangerForeground: colors.neutral[0],
    info: colors.info,
    positive: colors.app.emerald,
    positiveForeground: colors.neutral[0],
    primary: colors.app.midnight,
    primaryForeground: colors.neutral[0],
    surface: colors.app.surface,
    surfaceMuted: colors.neutral[50],
    success: colors.success,
    text: colors.app.text,
    textMuted: colors.app.textMuted,
    warning: colors.warning,
  },
  radius,
  shadows,
  spacing,
  typography,
} as const;

export const darkTheme = {
  id: 'dark',
  button: darkButton,
  colors: {
    accent: `${darkSemantic.midnight}22`,
    background: darkSemantic.canvas,
    border: darkSemantic.borderSubtle,
    danger: colors.danger,
    dangerForeground: colors.neutral[0],
    info: colors.info,
    positive: darkSemantic.emerald,
    positiveForeground: colors.neutral[0],
    primary: darkSemantic.midnight,
    primaryForeground: colors.neutral[900],
    surface: darkSemantic.surface,
    surfaceMuted: colors.neutral[800],
    success: colors.success,
    text: darkSemantic.text,
    textMuted: darkSemantic.textMuted,
    warning: colors.warning,
  },
  radius,
  shadows,
  spacing,
  typography,
} as const;

export type AppTheme = typeof lightTheme | typeof darkTheme;
export type ThemePreference = AppTheme['id'];
