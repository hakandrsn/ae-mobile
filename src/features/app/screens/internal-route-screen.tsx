import { AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { StyleSheet } from "react-native-unistyles";

export function InternalRouteScreen() {
  return (
    <AppScreen>
      <SurfaceCard style={styles.card}>
        <AppText variant="label">Hidden Tab</AppText>
        <AppText variant="title">Internal Route</AppText>
        <AppText color="muted">
          Bu route tabs icinde yasiyor ama tab barda gorunmuyor. Expo docstaki
          `href: null` paterni bunun icin en temiz yontem.
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
