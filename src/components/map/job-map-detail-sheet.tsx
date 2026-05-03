import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import type { RefObject } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  AppBottomSheetModal,
  type AppBottomSheetModalRef,
} from '@/components/ui/sheet/app-bottom-sheet-modal';
import { Button, Surface, Typography } from '@/components/ui';
import { useJob } from '@/services/jobs';

type JobMapDetailSheetProps = {
  sheetRef: RefObject<AppBottomSheetModalRef | null>;
  jobId: string | null;
  onDismiss: () => void;
};

function formatWage(value: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
}

function JobMapDetailBody({ jobId }: { jobId: string }) {
  const { data: job, isPending, isError, error, refetch, isFetching } = useJob(jobId);

  if (isPending) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !job) {
    return (
      <View style={styles.centered}>
        <Typography variant="bodyMuted" color="danger">
          {error instanceof Error ? error.message : 'İlan yüklenemedi.'}
        </Typography>
        <Button label="Yeniden dene" variant="surface" size="sm" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <View style={styles.detail}>
      <Typography variant="label" color="muted">
        {job.jobCategory}
      </Typography>
      <Typography variant="title">{job.title}</Typography>
      <Typography variant="bodyMuted">
        {job.district}, {job.city}
      </Typography>
      <Surface style={styles.card}>
        <Typography variant="headline">{formatWage(job.dailyWage)}</Typography>
        <Typography variant="caption" color="muted">
          Günlük ücret
        </Typography>
      </Surface>
      <View style={styles.metaRow}>
        <Typography variant="caption" color="muted">
          Vardiya: {job.shiftStartTime} – {job.shiftEndTime}
        </Typography>
      </View>
      {job.description ? (
        <Typography variant="bodyMuted" style={styles.description}>
          {job.description}
        </Typography>
      ) : null}
      {(job.user?.firstName || job.user?.lastName) && (
        <Typography variant="caption" color="muted">
          İlan sahibi: {[job.user?.firstName, job.user?.lastName].filter(Boolean).join(' ')}
        </Typography>
      )}
      {isFetching && !isPending ? (
        <Typography variant="caption" color="muted">
          Güncelleniyor…
        </Typography>
      ) : null}
    </View>
  );
}

export function JobMapDetailSheet({ sheetRef, jobId, onDismiss }: JobMapDetailSheetProps) {
  return (
    <AppBottomSheetModal
      ref={sheetRef}
      enableDynamicSizing={false}
      enablePanDownToClose
      index={0}
      onDismiss={onDismiss}
      snapPoints={['40%', '80%']}>
      <View style={styles.sheetRoot}>
        <BottomSheetScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          {jobId ? <JobMapDetailBody jobId={jobId} /> : null}
        </BottomSheetScrollView>
      </View>
    </AppBottomSheetModal>
  );
}

const styles = StyleSheet.create((theme) => ({
  sheetRoot: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
  detail: {
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: theme.radius.lg,
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
  },
  centered: {
    alignItems: 'center',
    gap: theme.spacing.md,
    justifyContent: 'center',
    minHeight: 120,
    paddingVertical: theme.spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  description: {
    marginTop: theme.spacing.xs,
  },
}));
