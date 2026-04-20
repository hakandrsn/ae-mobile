import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppButton, AppScreen, AppText, SurfaceCard } from "@/components/ui";
import { paths } from "@/core/navigation/paths";

import { useSession } from "../hooks/use-session";

export function SignInScreen() {
  const { signIn } = useSession();

  return (
    <AppScreen contentStyle={styles.centeredContent}>
      <SurfaceCard style={styles.heroCard}>
        <AppText variant="label">Auth</AppText>
        <AppText variant="title">Sign In</AppText>
        <AppText color="muted">
          Auth ekranlari ayri route group altinda tutulur. Kullanici giris
          yaptiginda route guard onu dogru yere yonlendirir. Mevcut user ise ana
          uygulamaya, onboarding eksikse onboarding akisina gider.
        </AppText>
        <View style={styles.actions}>
          <AppButton
            label="Mevcut Kullanici Sign In"
            onPress={async () => {
              await signIn();
              router.replace(paths.appHome);
            }}
            style={styles.fullWidth}
            tone="primary"
          />
          <AppButton
            label="Register'a Git"
            onPress={() => router.push(paths.register)}
            style={styles.fullWidth}
            tone="surface"
          />
          <AppButton
            label="Public Home"
            onPress={() => router.replace(paths.publicHome)}
            style={styles.fullWidth}
            tone="surface"
          />
        </View>
      </SurfaceCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create((theme) => ({
  actions: {
    gap: theme.spacing.sm,
  },
  centeredContent: {
    justifyContent: "center",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  heroCard: {
    borderRadius: theme.radius.xl,
    gap: theme.spacing.md,
  },
}));
