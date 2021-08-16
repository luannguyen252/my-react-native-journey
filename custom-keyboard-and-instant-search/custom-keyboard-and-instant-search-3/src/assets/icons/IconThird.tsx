import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  backgroundColor: string;
  labelColor: string;
}

function IconThird(props: Props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={10} fill={props.backgroundColor} />
      <Path
        d="M11.97 16.122c1.646 0 2.74-.85 2.74-2.11v-.01c0-.956-.684-1.562-1.729-1.66v-.029c.826-.17 1.47-.742 1.47-1.62v-.01c0-1.109-.976-1.851-2.495-1.851-1.48 0-2.47.8-2.568 2.021l-.005.06h1.352l.005-.045c.059-.547.528-.903 1.216-.903.693 0 1.099.342 1.099.913v.01c0 .571-.479.962-1.216.962h-.786v1.05h.805c.85 0 1.353.37 1.353 1.044v.01c0 .576-.488.981-1.245.981-.762 0-1.26-.375-1.323-.878l-.01-.054H9.227l.004.063c.098 1.216 1.143 2.056 2.74 2.056z"
        fill={props.labelColor}
      />
    </Svg>
  );
}

export default IconThird;
