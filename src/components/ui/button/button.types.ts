import { ReactNode } from 'react';

export type ButtonHaptic = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning';

export type ButtonIconRenderProps = {
  color: string;
  size: number;
};

export type ButtonIcon = (props: ButtonIconRenderProps) => ReactNode;
