import { memo, type ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

import { appIcons, type AppIconName } from '../app-icon.registry';

export type AppIconProps = Omit<SvgProps, 'width' | 'height'> & {
  name: AppIconName;
  size?: number;
  width?: number | string;
  height?: number | string;
};

type SvgIconComponent = ComponentType<SvgProps>;

export const Icon = memo(function IconComponent({
  name,
  size = 24,
  width,
  height,
  color,
  ...props
}: AppIconProps) {
  const Svg = appIcons[name] as SvgIconComponent;

  return <Svg color={color} height={height ?? size} width={width ?? size} {...props} />;
});

export type { AppIconName };
