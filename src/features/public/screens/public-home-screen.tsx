import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppScreen, Button, Surface, Typography } from '@/components/ui';
import { paths } from "@/core/navigation/paths";

export function PublicHomeScreen() {
  return (
    <AppScreen contentStyle={styles.centeredContent}>
      <Surface style={styles.heroCard}>
        <Typography variant="label">Public</Typography>
        <Typography variant="title">Expo Router Foundation</Typography>
        <Typography color="muted">
          Public sayfalar giris gerektirmez. Burasi onboarding, landing, legal veya marketing
          ekranlari icin dogru grup.
        </Typography>
        <View style={styles.actions}>
          <Button
            label="Sign In Flow'a Git"
            onPress={() => router.push(paths.signIn)}
            style={styles.fullWidth}
            variant="primary"
          />
          <Button
            label="Global Modal Ac"
            onPress={() => router.push(paths.modal)}
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
