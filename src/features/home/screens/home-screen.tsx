import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppScreen, Button, Surface, Typography } from '@/components/ui';
import { useAppTranslation } from "@/i18n";
import { useAppStore } from "@/store/app-store";

export function HomeScreen() {
  const { t } = useAppTranslation();
  const localeOverride = useAppStore((state) => state.localeOverride);
  const setLocaleOverride = useAppStore((state) => state.setLocaleOverride);

  const architectureItems = t("home.architectureItems", {
    returnObjects: true,
  }) as string[];

  return (
    <AppScreen>
      <View style={styles.heroSection}>
        <Typography variant="label">{t('home.badge')}</Typography>
        <Typography variant="title">{t('home.title')}</Typography>
        <Typography variant="bodyMuted">{t('home.description')}</Typography>
        <Button
          label={`${t('common.continue')} (${localeOverride ?? 'system'})`}
          onPress={() => setLocaleOverride(localeOverride === 'tr' ? 'en' : 'tr')}
        />
      </View>

      <Surface>
        <Typography variant="headline">{t('home.architectureTitle')}</Typography>
        {architectureItems.map((item) => (
          <Typography key={item} variant="bodyMuted">
            • {item}
          </Typography>
        ))}
      </Surface>

      <Surface>
        <Typography variant="headline">{t('home.nextTitle')}</Typography>
        <Typography variant="bodyMuted">{t('home.nextDescription')}</Typography>
      </Surface>
    </AppScreen>
  );
}

const styles = StyleSheet.create((theme) => ({
  heroSection: {
    backgroundColor: theme.colors.surfaceMuted,
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
  },
}));
