import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconArrowLeftLong32(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M13.518 23.67a1.225 1.225 0 01-.913-.406L6.81 16.826a1.22 1.22 0 01-.245-.397l-.001-.002a1.22 1.22 0 01-.074-.332l-.001-.003a1.303 1.303 0 01-.004-.096v-.002c0-.033.002-.066.004-.099v-.002a1.22 1.22 0 01.075-.332v-.003l.042-.096a1.22 1.22 0 01.204-.3l5.795-6.439a1.228 1.228 0 011.825 1.644l-3.958 4.398h13.824a1.228 1.228 0 110 2.457H10.472l3.958 4.399a1.229 1.229 0 01-.912 2.05z"
        fill={props.color}
      />
    </Svg>
  );
}

export default IconArrowLeftLong32;
