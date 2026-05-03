import { router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

import { AppScreen, Button, Surface, Typography } from '@/components/ui';

export function GlobalModalScreen() {
  return (
    <AppScreen contentStyle={styles.centeredContent}>
      <Surface style={styles.card}>
        <Typography variant="label">Modal Route</Typography>
        <Typography variant="title">Global Modal</Typography>
        <Typography color="muted">
          Kisa ama navigation historynin parcasi olmasi gereken akislarda Expo Router modal routeu
          kullanilir. Basit confirm/popup senaryolari icin ise React Native `Modal` daha dogrudur.
        </Typography>
        <Button
          label="Modal Kapat"
          onPress={() => router.back()}
          style={styles.fullWidth}
          variant="primary"
        />
      </Surface>
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
