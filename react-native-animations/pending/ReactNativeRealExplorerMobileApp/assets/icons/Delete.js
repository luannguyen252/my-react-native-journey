import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Delete(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15.78 4V2h-7.5v2H3.03v1.5h6.75v-2h4.5v2h6.69V4h-5.19zM5 22h14l2-15H3l2 15zm12.62-1.5H6.34l-1.6-12h14.52l-1.64 12z"
        fill="#000"
      />
      <Path d="M10.72 13h-1.5v3h1.5v-3zM14.72 13h-1.5v3h1.5v-3z" fill="#000" />
    </Svg>
  );
}
