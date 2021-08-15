import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function CustomArrowUp(props) {
  return (
    <Svg
      width={props?.width}
      height={props?.height}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9 0L0 17h1.76A10.25 10.25 0 019 20a10.25 10.25 0 017.24-3H18L9 0zm.74 17.46L9 13l-.85 4.39a11.62 11.62 0 00-5.67-1.87L9 3.21l6.52 12.31a11.76 11.76 0 00-5.78 1.94z"
        fill="#fff"
      />
    </Svg>
  );
}
