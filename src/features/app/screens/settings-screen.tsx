import { AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { StyleSheet } from "react-native-unistyles";

export function SettingsScreen() {
  return (
    <AppScreen>
      <SurfaceCard style={styles.card}>
        <AppText variant="label">Stack Screen</AppText>
        <AppText variant="title">Settings</AppText>
        <AppText color="muted">
          Tabs disindaki ama modal olmayan ikincil ekranlar bu seviyede
          tutulabilir. Bu sayede header, gestures ve transition ayarlari stack
          bazinda yonetilir.
        </AppText>
      </SurfaceCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: theme.radius.xl,
  },
}));
