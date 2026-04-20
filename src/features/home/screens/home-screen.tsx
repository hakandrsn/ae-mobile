import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";
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
        <AppText variant="label">{t("home.badge")}</AppText>
        <AppText variant="title">{t("home.title")}</AppText>
        <AppText variant="bodyMuted">{t("home.description")}</AppText>
        <AppButton
          label={`${t("common.continue")} (${localeOverride ?? "system"})`}
          onPress={() =>
            setLocaleOverride(localeOverride === "tr" ? "en" : "tr")
          }
        />
      </View>

      <SurfaceCard>
        <AppText variant="headline">{t("home.architectureTitle")}</AppText>
        {architectureItems.map((item) => (
          <AppText key={item} variant="bodyMuted">
            • {item}
          </AppText>
        ))}
      </SurfaceCard>

      <SurfaceCard>
        <AppText variant="headline">{t("home.nextTitle")}</AppText>
        <AppText variant="bodyMuted">{t("home.nextDescription")}</AppText>
      </SurfaceCard>
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
