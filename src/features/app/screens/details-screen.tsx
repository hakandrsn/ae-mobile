import { useLocalSearchParams, router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

import { AppScreen, Button, Surface, Typography } from '@/components/ui';

export function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <AppScreen>
      <Surface style={styles.card}>
        <Typography variant="label">Stack Sibling</Typography>
        <Typography variant="title">Details {id}</Typography>
        <Typography color="muted">
          Bu ekran tabs grubunun disinda tanimlandigi icin tab bar otomatik olarak gizlenir. Detay,
          checkout, onboarding-step gibi tam ekran akislarda en dogru pattern bu.
        </Typography>
        <Button
          label="Geri Don"
          onPress={() => router.back()}
          style={styles.fullWidth}
          variant="surface"
        />
      </Surface>
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
