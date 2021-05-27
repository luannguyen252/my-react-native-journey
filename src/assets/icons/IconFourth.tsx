import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  backgroundColor: string;
  labelColor: string;
}

function IconFourth(props: Props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={10} fill={props.backgroundColor} />
      <Path
        d="M12.62 16h1.402v-1.294h.927V13.53h-.928V8.954h-2.08l-2.827 4.522v1.23h3.506V16zm-2.222-2.432v-.039l2.217-3.51h.034v3.55H10.4z"
        fill={props.labelColor}
      />
    </Svg>
  );
}

export default IconFourth;
