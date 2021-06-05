import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  backgroundColor: string;
  labelColor: string;
}

function IconFirst(props: Props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={10} fill={props.backgroundColor} />
      <Path
        d="M11.858 16h1.46V8.954h-1.464l-1.822 1.265v1.308l1.797-1.22h.03V16z"
        fill={props.labelColor}
      />
    </Svg>
  );
}

export default IconFirst;
