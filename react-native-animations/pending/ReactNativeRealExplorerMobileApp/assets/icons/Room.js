import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Room(props) {
  return (
    <Svg
      width={props?.width}
      height={props?.height}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1.5 13.425h10.834a.833.833 0 00.833-.833V1.758a.833.833 0 00-.833-.833H8.167v.833h4.167V8.84H8.167v.833h4.167v2.917H6.917V9.258h-.833v3.333H1.5V7.175h5v-.833H5.25v-1.25h-.833v1.25H1.5V1.758h4.167V.925H1.5a.833.833 0 00-.833.833v10.834a.833.833 0 00.833.833zM16.209 11.85V2.175l.533.533.592-.583-1.542-1.55L14.267 2.1l.592.592.517-.517v9.633l-.517-.517-.592.583 1.542 1.55 1.525-1.525-.592-.592-.533.543z"
        fill="#000"
        fillOpacity={0.5}
      />
    </Svg>
  );
}
