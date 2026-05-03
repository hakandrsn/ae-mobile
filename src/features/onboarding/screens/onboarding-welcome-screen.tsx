import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppScreen, Button, Surface, Typography } from '@/components/ui';
import { paths } from "@/core/navigation/paths";
import { useSession } from "@/features/auth";

export function OnboardingWelcomeScreen() {
  const { completeOnboarding, signOut } = useSession();

  return (
    <AppScreen contentStyle={styles.centeredContent} tabBarScrollBehavior="locked">
      <Surface style={styles.heroCard}>
        <Typography variant="label">Onboarding</Typography>
        <Typography variant="title">Hos Geldin</Typography>
        <Typography color="muted">
          Bu alan register sonrasi ilk kurulumu temsil eder. Profil tamamlama, ilgi alani secimi,
          izin onboardingi gibi akislari burada toplariz.
        </Typography>
        <View style={styles.actions}>
          <Button
            label="Onboarding'i Tamamla"
            onPress={() => {
              completeOnboarding();
              router.replace(paths.appHome);
            }}
            style={styles.fullWidth}
            variant="primary"
          />
          <Button
            label="Cikisa Don"
            onPress={async () => {
              await signOut();
              router.replace(paths.onboardingWelcome);
            }}
            style={styles.fullWidth}
            variant="surface"
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
