declare module "*.svg" {
  import type { FC, MemoExoticComponent } from "react";
  import type { SvgProps } from "react-native-svg";

  const content: MemoExoticComponent<FC<SvgProps>>;
  export default content;
}
