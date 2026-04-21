import { memo } from "react";
import type { SvgProps } from "react-native-svg";

import { appIcons, type AppIconName } from "./app-icon.registry";

export type AppIconProps = Omit<SvgProps, "width" | "height"> & {
  name: AppIconName;
  size?: number;
  width?: number | string;
  height?: number | string;
};

export const AppIcon = memo(function AppIcon({
  name,
  size = 24,
  width,
  height,
  color,
  ...props
}: AppIconProps) {
  const Icon = appIcons[name];

  return (
    <Icon
      color={color}
      height={height ?? size}
      width={width ?? size}
      {...props}
    />
  );
});

export type { AppIconName };
