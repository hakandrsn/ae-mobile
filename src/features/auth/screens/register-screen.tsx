import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { paths } from "@/core/navigation/paths";

import { useSession } from "../hooks/use-session";

export function RegisterScreen() {
  const { register } = useSession();

  return (
    <AppScreen contentStyle={styles.centeredContent}>
      <SurfaceCard style={styles.heroCard}>
        <AppText variant="label">Auth</AppText>
        <AppText variant="title">Register</AppText>
        <AppText color="muted">
          Yeni kullanici register oldugunda session olusur ama onboarding henüz
          tamamlanmadigi icin route guard onu onboarding akisina gonderir.
        </AppText>
        <View style={styles.actions}>
          <AppButton
            label="Demo Register"
            onPress={async () => {
              await register();
              router.replace(paths.onboardingWelcome);
            }}
            style={styles.fullWidth}
            tone="primary"
          />
          <AppButton
            label="Sign In'a Don"
            onPress={() => router.replace(paths.signIn)}
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
