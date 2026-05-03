import { AppScreen, Surface, Typography } from '@/components/ui';
import { StyleSheet } from "react-native-unistyles";

export function InternalRouteScreen() {
  return (
    <AppScreen>
      <Surface style={styles.card}>
        <Typography variant="label">Hidden Tab</Typography>
        <Typography variant="title">Internal Route</Typography>
        <Typography color="muted">
          Bu route tabs icinde yasiyor ama tab barda gorunmuyor. Expo docstaki `href: null` paterni
          bunun icin en temiz yontem.
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
