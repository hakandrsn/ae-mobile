import { Redirect } from 'expo-router';

import { paths } from '@/core/navigation/paths';
import { useSession } from '@/features/auth';

/** "/" → onboarding veya ana uygulama (Stack.Protected ile uyumlu, initialRouteName gerekmez). */
export default function RootIndexRedirect() {
  const { hasCompletedOnboarding, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href={paths.onboardingWelcome} />;
  }

  return <Redirect href={paths.appHome} />;
}
