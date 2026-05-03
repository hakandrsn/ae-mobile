import { router } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { AppScreen, Button, Surface, Typography } from '@/components/ui';
import { paths } from "@/core/navigation/paths";

import { useSession } from "../hooks/use-session";

export function SignInScreen() {
  const { signIn } = useSession();

  return (
    <AppScreen contentStyle={styles.centeredContent}>
      <Surface style={styles.heroCard}>
        <Typography variant="label">Auth</Typography>
        <Typography variant="title">Sign In</Typography>
        <Typography color="muted">
          Auth ekranlari ayri route group altinda tutulur. Kullanici giris yaptiginda route guard
          onu dogru yere yonlendirir. Mevcut user ise ana uygulamaya, onboarding eksikse onboarding
          akisina gider.
        </Typography>
        <View style={styles.actions}>
          <Button
            label="Mevcut Kullanici Sign In"
            onPress={async () => {
              await signIn();
              router.replace(paths.appHome);
            }}
            style={styles.fullWidth}
            variant="primary"
          />
          <Button
            label="Register'a Git"
            onPress={() => router.push(paths.register)}
            style={styles.fullWidth}
            variant="surface"
          />
          <Button
            label="Ana Sayfaya Git"
            onPress={() => router.replace(paths.appHome)}
            style={styles.fullWidth}
            variant="surface"
          />
        </View>
      </Surface>
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
