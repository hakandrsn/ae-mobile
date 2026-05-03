import { StyleSheet } from 'react-native-unistyles';
import { Map } from '@/components/map';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export function AppHomeScreen() {
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaProvider style={[styles.container]}>
      <Map />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
