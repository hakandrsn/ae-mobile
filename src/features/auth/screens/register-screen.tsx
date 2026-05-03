import { router } from 'expo-router';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { AppScreen, Button, Surface, Typography } from '@/components/ui';
import { paths } from '@/core/navigation/paths';

import { useSession } from '../hooks/use-session';

export function RegisterScreen() {
  const { register } = useSession();

  return (
    <AppScreen contentStyle={styles.centeredContent}>
      <Surface style={styles.heroCard}>
        <Typography variant="label">Auth</Typography>
        <Typography variant="title">Register</Typography>
        <Typography color="muted">
          Yeni kullanici register oldugunda session olusur ama onboarding henüz tamamlanmadigi icin
          route guard onu onboarding akisina gonderir.
        </Typography>
        <View style={styles.actions}>
          <Button
            label="Demo Register"
            onPress={async () => {
              await register();
              router.replace(paths.onboardingWelcome);
            }}
            style={styles.fullWidth}
            variant="primary"
          />
          <Button
            label="Sign In'a Don"
            onPress={() => router.replace(paths.signIn)}
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
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  heroCard: {
    borderRadius: theme.radius.xl,
    gap: theme.spacing.md,
  },
}));
