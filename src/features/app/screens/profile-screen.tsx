import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { paths } from "@/core/navigation/paths";

export function ProfileScreen() {
  return (
    <AppScreen>
      <SurfaceCard style={styles.card}>
        <AppText variant="label">Tab</AppText>
        <AppText variant="title">Profile</AppText>
        <AppText color="muted">
          Profil tabi kullanicinin kalici olarak gormesi gereken ana
          navigasyon hedeflerinden biri.
        </AppText>
        <AppButton
          label="Profile Details"
          onPress={() => router.push(paths.details("profile"))}
          style={styles.fullWidth}
          tone="surface"
        />
      </SurfaceCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: theme.radius.xl,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
}));
