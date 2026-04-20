import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";

export function GlobalModalScreen() {
  return (
    <AppScreen contentStyle={styles.centeredContent}>
      <SurfaceCard style={styles.card}>
        <AppText variant="label">Modal Route</AppText>
        <AppText variant="title">Global Modal</AppText>
        <AppText color="muted">
          Kisa ama navigation historynin parcasi olmasi gereken akislarda Expo
          Router modal routeu kullanilir. Basit confirm/popup senaryolari icin
          ise React Native `Modal` daha dogrudur.
        </AppText>
        <AppButton
          label="Modal Kapat"
          onPress={() => router.back()}
          style={styles.fullWidth}
          tone="primary"
        />
      </SurfaceCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: theme.radius.xl,
  },
  centeredContent: {
    justifyContent: "center",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
}));
