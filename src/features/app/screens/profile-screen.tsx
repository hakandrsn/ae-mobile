import { router } from 'expo-router';
import { StyleSheet } from 'react-native-unistyles';

import { AppScreen, Button, Icon, Surface, Typography } from '@/components/ui';
import { paths } from '@/core/navigation/paths';
import { useAppTranslation, useLocaleSettings } from '@/i18n';
import { useAppStore } from '@/store';
import { useSession } from '@/features/auth';
import { useAppTheme } from '@/core/providers/theme-provider';
import { View } from 'react-native';

export function ProfileScreen() {
  const { t } = useAppTranslation();
  const colorScheme = useAppStore((state) => state.themePreference);
  const setLocaleOverride = useAppStore((state) => state.setLocaleOverride);
  const toggleThemePreference = useAppStore((state) => state.toggleThemePreference);
  const { direction, locale, isRTL } = useLocaleSettings();
  const { signOut } = useSession();
  const { theme } = useAppTheme();

  return (
    <AppScreen tabBarScrollBehavior="locked">
      <Surface style={styles.card}>
        <Typography variant="label">Protected App</Typography>
        <Typography variant="title">Home Tab</Typography>
        <Typography color="muted">
          Burasi auth gerektiren ana uygulama alani. Tabs burada yasar. Tab bari gizlemek
          istedigimiz detay ekranlari ise tabs grubunun disinda, ayni stack icinde sibling route
          olarak tanimlanir.
        </Typography>
      </Surface>
      <Icon name="add-1" size={48} color={theme.colors.primary} />
      <Surface>
        <Typography variant="headline">{t('settings.languageSectionTitle')}</Typography>
        <View style={[styles.languageButtons, isRTL ? styles.justifyEnd : styles.justifyStart]}>
          {(['en', 'tr', 'ar'] as const).map((language) => {
            const isActive = locale === language;

            return (
              <Button
                key={language}
                label={t(`settings.languageNames.${language}`)}
                onPress={() => setLocaleOverride(language)}
                style={styles.languageButton}
                variant={isActive ? 'primary' : 'surface'}
              />
            );
          })}
        </View>
        <Typography color="muted">
          Locale: {locale.toUpperCase()} | Direction: {direction.toUpperCase()}
        </Typography>
      </Surface>

      <Surface>
        <Typography variant="headline">{t('settings.themeSectionTitle')}</Typography>
        <View style={styles.actions}>
          <Typography color="muted">Theme: {colorScheme === 'light' ? 'LIGHT' : 'DARK'}</Typography>
          <Button
            label={
              colorScheme === 'light' ? t('settings.switchToDark') : t('settings.switchToLight')
            }
            onPress={toggleThemePreference}
            style={styles.fullWidth}
            variant="secondary"
          />
        </View>
      </Surface>

      <Surface>
        <Typography variant="headline">Navigation Patterns</Typography>
        <View style={styles.actions}>
          <Button
            label="Details Ekranina Git (tab bar gizlenir)"
            onPress={() => router.push(paths.details('42'))}
            style={styles.fullWidth}
            variant="primary"
          />
          <Button
            label="Settings Ekrani"
            onPress={() => router.push(paths.settings)}
            style={styles.fullWidth}
            variant="surface"
          />
          <Button
            label="Global Modal"
            onPress={() => router.push(paths.modal)}
            style={styles.fullWidth}
            variant="surface"
          />
          <Button
            label="Hidden Tab Routea Git"
            onPress={() => router.push(paths.internalTab)}
            style={styles.fullWidth}
            variant="surface"
          />
          <Button
            label="Sign Out"
            onPress={async () => {
              await signOut();
              router.replace(paths.signIn);
            }}
            style={styles.fullWidth}
            variant="secondary"
          />
        </View>
      </Surface>
    </AppScreen>
  );
}

const styles = StyleSheet.create((theme) => ({
  actions: {
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: theme.radius.xl,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  languageButton: {
    minWidth: 96,
  },
  languageButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xxs,
  },
}));
