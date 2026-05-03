import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button, Surface, Typography } from '@/components/ui';
import {
  AppBottomSheetModal,
  type AppBottomSheetModalRef,
} from '@/components/ui/sheet/app-bottom-sheet-modal';
import { useSession } from '@/features/auth';

type LoginSheetContextValue = {
  presentLoginSheet: () => void;
  dismissLoginSheet: () => void;
};

const LoginSheetContext = createContext<LoginSheetContextValue | null>(null);

function LoginSheetBody({ onAuthed }: { onAuthed: () => void }) {
  const { signIn } = useSession();

  return (
    <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
      <Surface style={styles.card}>
        <Typography variant="label">Giris</Typography>
        <Typography variant="title">Hesabiniza girin</Typography>
        <Typography color="muted">
          Tab ve korumali icerige erismek icin oturum acin. Auth tamamlandiginda bu sheet gercek
          form ile degistirilebilir.
        </Typography>
        <Button
          label="Demo ile giris yap"
          onPress={async () => {
            await signIn();
            onAuthed();
          }}
          style={styles.fullWidth}
          variant="primary"
        />
      </Surface>
    </BottomSheetScrollView>
  );
}

export function LoginSheetProvider({ children }: PropsWithChildren) {
  const sheetRef = useRef<AppBottomSheetModalRef>(null);

  const presentLoginSheet = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const dismissLoginSheet = useCallback(() => {
    sheetRef.current?.dismiss();
  }, []);

  const contextValue = useMemo<LoginSheetContextValue>(
    () => ({
      dismissLoginSheet,
      presentLoginSheet,
    }),
    [dismissLoginSheet, presentLoginSheet],
  );

  return (
    <LoginSheetContext.Provider value={contextValue}>
      {children}
      <AppBottomSheetModal
        ref={sheetRef}
        enableDynamicSizing={false}
        enablePanDownToClose
        index={0}
        snapPoints={['45%', '88%']}>
        <View style={styles.sheetRoot}>
          <LoginSheetBody onAuthed={dismissLoginSheet} />
        </View>
      </AppBottomSheetModal>
    </LoginSheetContext.Provider>
  );
}

export function useLoginSheet() {
  const ctx = useContext(LoginSheetContext);
  if (!ctx) {
    throw new Error('useLoginSheet must be used within LoginSheetProvider');
  }
  return ctx;
}

const styles = StyleSheet.create((theme) => ({
  sheetContent: {
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  sheetRoot: {
    flex: 1,
  },
  card: {
    borderRadius: theme.radius.xl,
    gap: theme.spacing.md,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
}));
