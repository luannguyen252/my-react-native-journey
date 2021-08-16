import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  backgroundColor: string;
  labelColor: string;
}

function IconSecond(props: Props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={10} fill={props.backgroundColor} />
      <Path
        d="M9.48 16h5.122v-1.172H11.41v-.058l1.475-1.348c1.216-1.118 1.62-1.675 1.62-2.53v-.01c0-1.2-1.024-2.05-2.514-2.05-1.489 0-2.593.933-2.593 2.26v.04h1.368l.005-.044c.02-.635.507-1.109 1.23-1.109.625 0 1.065.41 1.07.987v.01c0 .488-.191.834-1.1 1.684l-2.49 2.33V16z"
        fill={props.labelColor}
      />
    </Svg>
  );
}

export default IconSecond;
