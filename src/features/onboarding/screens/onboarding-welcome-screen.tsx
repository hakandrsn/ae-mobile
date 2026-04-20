import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { paths } from "@/core/navigation/paths";
import { useSession } from "@/features/auth";

export function OnboardingWelcomeScreen() {
  const { completeOnboarding, signOut } = useSession();

  return (
    <AppScreen contentStyle={styles.centeredContent} tabBarScrollBehavior="locked">
      <SurfaceCard style={styles.heroCard}>
        <AppText variant="label">Onboarding</AppText>
        <AppText variant="title">Hos Geldin</AppText>
        <AppText color="muted">
          Bu alan register sonrasi ilk kurulumu temsil eder. Profil tamamlama,
          ilgi alani secimi, izin onboardingi gibi akislari burada toplariz.
        </AppText>
        <View style={styles.actions}>
          <AppButton
            label="Onboarding'i Tamamla"
            onPress={() => {
              completeOnboarding();
              router.replace(paths.appHome);
            }}
            style={styles.fullWidth}
            tone="primary"
          />
          <AppButton
            label="Cikisa Don"
            onPress={async () => {
              await signOut();
              router.replace(paths.publicHome);
            }}
            style={styles.fullWidth}
            tone="surface"
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
  centeredContent: {
    justifyContent: "center",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  heroCard: {
    borderRadius: theme.radius.xl,
    gap: theme.spacing.md,
  },
}));
