import { AppScreen, Surface, Typography } from '@/components/ui';
import { StyleSheet } from "react-native-unistyles";

export function SearchScreen() {
  return (
    <AppScreen>
      <Surface style={styles.card}>
        <Typography variant="label">Tab</Typography>
        <Typography variant="title">Search</Typography>
        <Typography color="muted">
          Search gibi ana navigasyon ekranlari tabs altinda kalir. Buraya kendi nested stackin de
          eklenebilir.
        </Typography>
      </Surface>
    </AppScreen>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: theme.radius.xl,
  },
}));
