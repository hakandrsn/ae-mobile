import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Icon } from '@/components/ui/icon';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type JobMapPinProps = {
  category: string;
};

/** Sabit boyut: pin yuvası; anchor hesapları buna göre. */
export const PIN_SIZE = 40;

/**
 * Görsel pin ucunun kutu altından ne kadar yukarıda olduğu (pt). SVG/ölçekleme ve anlık görüntü yuvarlaması;
 * hâlâ kayma varsa yalnızca bu değeri küçük adımlarla artır/azalt (ör. 4–10 arası).
 */
export const MAP_MARKER_TIP_INSET_FROM_BOTTOM = 6;

/** Google Maps ve Apple’da kullanılan anchor (y: uç hizası). */
export const mapMarkerAnchor = {
  x: 0.5,
  y: 1 - MAP_MARKER_TIP_INSET_FROM_BOTTOM / PIN_SIZE,
} as const;

/** Apple Maps: merkez yerine iğne ucunu koordinata bağlamak için. */
export const mapMarkerIosCenterOffset = {
  x: 0,
  y: -(PIN_SIZE / 2 + MAP_MARKER_TIP_INSET_FROM_BOTTOM),
} as const;
const LABEL_GAP = 4;
const ANCHOR_WIDTH = 160;

export function JobMapPin({ category }: JobMapPinProps) {
  return (
    <View style={styles.anchorBox} collapsable={false}>
      <View style={styles.labelWrap} pointerEvents="none">
        <View style={styles.caption}>
          <Text style={styles.captionText} numberOfLines={2}>
            {category}
          </Text>
        </View>
      </View>
      <View style={styles.pinSlot}>
        <Icon name="marker" size={PIN_SIZE} color={colors.danger} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  anchorBox: {
    width: ANCHOR_WIDTH,
    height: PIN_SIZE,
    alignItems: 'center',
  },
  labelWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: PIN_SIZE + LABEL_GAP,
    alignItems: 'center',
  },
  caption: {
    maxWidth: 148,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
    backgroundColor: colors.neutral[0],
    borderWidth: 1,
    borderColor: colors.app.borderSubtle,
  },
  captionText: {
    textAlign: 'center',
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.xs,
    color: colors.app.text,
  },
  pinSlot: {
    width: PIN_SIZE,
    height: PIN_SIZE,
  },
});
