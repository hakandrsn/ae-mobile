import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { paths } from "@/core/navigation/paths";
import { useAppTranslation, useLocaleSettings } from "@/i18n";
import { useAppStore } from "@/store";

import { useSession } from "@/features/auth";

export function AppHomeScreen() {
  const { t } = useAppTranslation();
  const colorScheme = useAppStore((state) => state.themePreference);
  const setLocaleOverride = useAppStore((state) => state.setLocaleOverride);
  const toggleThemePreference = useAppStore(
    (state) => state.toggleThemePreference,
  );
  const { direction, locale, isRTL } = useLocaleSettings();
  const { signOut } = useSession();

  return (
    <AppScreen tabBarScrollBehavior="locked">
      <SurfaceCard style={styles.card}>
        <AppText variant="label">Protected App</AppText>
        <AppText variant="title">Home Tab</AppText>
        <AppText color="muted">
          Burasi auth gerektiren ana uygulama alani. Tabs burada yasar. Tab
          bari gizlemek istedigimiz detay ekranlari ise tabs grubunun disinda,
          ayni stack icinde sibling route olarak tanimlanir.
        </AppText>
      </SurfaceCard>

      <SurfaceCard>
        <AppText variant="headline">{t("settings.languageSectionTitle")}</AppText>
        <View
          style={[
            styles.languageButtons,
            isRTL ? styles.justifyEnd : styles.justifyStart,
          ]}
        >
          {(["en", "tr", "ar"] as const).map((language) => {
            const isActive = locale === language;

            return (
              <AppButton
                key={language}
                label={t(`settings.languageNames.${language}`)}
                onPress={() => setLocaleOverride(language)}
                style={styles.languageButton}
                tone={isActive ? "primary" : "surface"}
              />
            );
          })}
        </View>
        <AppText color="muted">
          Locale: {locale.toUpperCase()} | Direction: {direction.toUpperCase()}
        </AppText>
      </SurfaceCard>

      <SurfaceCard>
        <AppText variant="headline">{t("settings.themeSectionTitle")}</AppText>
        <View style={styles.actions}>
          <AppText color="muted">
            Theme: {colorScheme === "light" ? "LIGHT" : "DARK"}
          </AppText>
          <AppButton
            label={
              colorScheme === "light"
                ? t("settings.switchToDark")
                : t("settings.switchToLight")
            }
            onPress={toggleThemePreference}
            style={styles.fullWidth}
            tone="foreground"
          />
        </View>
      </SurfaceCard>

      <SurfaceCard>
        <AppText variant="headline">Navigation Patterns</AppText>
        <View style={styles.actions}>
          <AppButton
            label="Details Ekranina Git (tab bar gizlenir)"
            onPress={() => router.push(paths.details("42"))}
            style={styles.fullWidth}
            tone="primary"
          />
          <AppButton
            label="Settings Ekrani"
            onPress={() => router.push(paths.settings)}
            style={styles.fullWidth}
            tone="surface"
          />
          <AppButton
            label="Global Modal"
            onPress={() => router.push(paths.modal)}
            style={styles.fullWidth}
            tone="surface"
          />
          <AppButton
            label="Hidden Tab Routea Git"
            onPress={() => router.push(paths.internalTab)}
            style={styles.fullWidth}
            tone="surface"
          />
          <AppButton
            label="Sign Out"
            onPress={async () => {
              await signOut();
              router.replace(paths.publicHome);
            }}
            style={styles.fullWidth}
            tone="foreground"
          />
        </View>
      </SurfaceCard>
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
    alignSelf: "stretch",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  languageButton: {
    minWidth: 96,
  },
  languageButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.xxs,
  },
}));
