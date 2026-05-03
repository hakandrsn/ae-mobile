import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import type { JobStatus } from '@/services/jobs/types';
import { colors, radius, spacing, typography } from '@/theme/tokens';

function paletteForStatus(status: JobStatus) {
  switch (status) {
    case 'OPEN':
      return { backgroundColor: colors.success, textColor: colors.neutral[0] };
    case 'IN_PROGRESS':
      return { backgroundColor: colors.info, textColor: colors.neutral[0] };
    case 'COMPLETED':
      return { backgroundColor: colors.neutral[500], textColor: colors.neutral[0] };
    case 'CANCELLED':
      return { backgroundColor: colors.danger, textColor: colors.neutral[0] };
    default:
      return { backgroundColor: colors.neutral[600], textColor: colors.neutral[0] };
  }
}

type JobMapMarkerLabelProps = {
  title: string;
  status: JobStatus;
};

export function JobMapMarkerLabel({ title, status }: JobMapMarkerLabelProps) {
  const { backgroundColor, textColor } = paletteForStatus(status);
  return (
    <View style={[styles.bubble, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: 168,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.sm,
  },
  title: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.xs,
  },
});
