import { AppScreen, Surface, Typography } from '@/components/ui';
import { StyleSheet } from "react-native-unistyles";

export function SettingsScreen() {
  return (
    <AppScreen>
      <Surface style={styles.card}>
        <Typography variant="label">Stack Screen</Typography>
        <Typography variant="title">Settings</Typography>
        <Typography color="muted">
          Tabs disindaki ama modal olmayan ikincil ekranlar bu seviyede tutulabilir. Bu sayede
          header, gestures ve transition ayarlari stack bazinda yonetilir.
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
