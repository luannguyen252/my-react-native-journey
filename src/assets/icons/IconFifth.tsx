import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  backgroundColor: string;
  labelColor: string;
}

function IconFifth(props: Props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={10} fill={props.backgroundColor} />
      <Path
        d="M12.078 16.122c1.612 0 2.725-1 2.725-2.476v-.01c0-1.327-.967-2.29-2.305-2.29-.713 0-1.294.289-1.587.762h-.03l.172-1.982h3.325V8.954H9.88l-.322 4.136h1.284c.083-.147.195-.283.337-.39.239-.191.547-.299.908-.299.762 0 1.304.523 1.309 1.265v.01c0 .752-.543 1.28-1.314 1.28-.679 0-1.172-.411-1.274-.943l-.01-.034H9.437l.004.073c.088 1.177 1.104 2.07 2.637 2.07z"
        fill={props.labelColor}
      />
    </Svg>
  );
}

export default IconFifth;
