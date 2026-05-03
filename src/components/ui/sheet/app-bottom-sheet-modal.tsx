import { BottomSheetModal, type BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { forwardRef, type ElementRef } from 'react';

import { renderSheetBackdrop } from './sheet-backdrop';

export type AppBottomSheetModalProps = BottomSheetModalProps;

export type AppBottomSheetModalRef = ElementRef<typeof BottomSheetModal>;

/**
 * Ortak backdrop + klavye varsayılanları. Üst üste ikinci bir modal açarken
 * gorhom’da {@link BottomSheetModalProps.stackBehavior} = `'push'` kullan.
 */
export const AppBottomSheetModal = forwardRef<AppBottomSheetModalRef, AppBottomSheetModalProps>(
  function AppBottomSheetModal(
    {
      backdropComponent = renderSheetBackdrop,
      enablePanDownToClose = true,
      keyboardBehavior = 'interactive',
      keyboardBlurBehavior = 'restore',
      ...rest
    },
    ref,
  ) {
    return (
      <BottomSheetModal
        ref={ref}
        backdropComponent={backdropComponent}
        enablePanDownToClose={enablePanDownToClose}
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        {...rest}
      />
    );
  },
);
