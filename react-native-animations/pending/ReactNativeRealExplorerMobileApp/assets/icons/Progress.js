import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

export function Progress(props) {
  return (
    <Svg
      width={128}
      height={4}
      viewBox="0 0 128 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={128} height={4} rx={2} fill="#F7F9FC" />
      <Rect width={22} height={4} rx={2} fill="#3E79E3" />
    </Svg>
  );
}
