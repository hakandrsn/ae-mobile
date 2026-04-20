import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { paths } from "@/core/navigation/paths";

export function PublicHomeScreen() {
  return (
    <AppScreen contentStyle={styles.centeredContent}>
      <SurfaceCard style={styles.heroCard}>
        <AppText variant="label">Public</AppText>
        <AppText variant="title">Expo Router Foundation</AppText>
        <AppText color="muted">
          Public sayfalar giris gerektirmez. Burasi onboarding, landing, legal
          veya marketing ekranlari icin dogru grup.
        </AppText>
        <View style={styles.actions}>
          <AppButton
            label="Sign In Flow'a Git"
            onPress={() => router.push(paths.signIn)}
            style={styles.fullWidth}
            tone="primary"
          />
          <AppButton
            label="Global Modal Ac"
            onPress={() => router.push(paths.modal)}
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
