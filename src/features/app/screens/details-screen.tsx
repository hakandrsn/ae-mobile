import { useLocalSearchParams, router } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";

export function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <AppScreen>
      <SurfaceCard style={styles.card}>
        <AppText variant="label">Stack Sibling</AppText>
        <AppText variant="title">Details {id}</AppText>
        <AppText color="muted">
          Bu ekran tabs grubunun disinda tanimlandigi icin tab bar otomatik
          olarak gizlenir. Detay, checkout, onboarding-step gibi tam ekran
          akislarda en dogru pattern bu.
        </AppText>
        <AppButton
          label="Geri Don"
          onPress={() => router.back()}
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
