import { AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { StyleSheet } from "react-native-unistyles";

export function SearchScreen() {
  return (
    <AppScreen>
      <SurfaceCard style={styles.card}>
        <AppText variant="label">Tab</AppText>
        <AppText variant="title">Search</AppText>
        <AppText color="muted">
          Search gibi ana navigasyon ekranlari tabs altinda kalir. Buraya kendi
          nested stackin de eklenebilir.
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
