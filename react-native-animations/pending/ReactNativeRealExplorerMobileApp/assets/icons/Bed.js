import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Bed(props) {
  return (
    <Svg
      width={props?.width}
      height={props?.height}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.5 7.633v-7.3h-.833V2.35H14a11.183 11.183 0 00-10 0H2.334V.333H1.5v7.292a.833.833 0 00-.833.833v3.333a.833.833 0 00.833.833h1.25v1.042h.833v-1.041h10.834v1.042h.833v-1.042h1.25a.833.833 0 00.833-.833V8.458a.833.833 0 00-.833-.825zM4 3.183h.2l.175-.092a10.35 10.35 0 019.258 0l.175.092h1.859v4.442h-.833V7a1.667 1.667 0 00-1.667-1.667H10.25A1.667 1.667 0 009 5.908a1.667 1.667 0 00-1.25-.575H4.834A1.667 1.667 0 003.167 7v.625h-.833V3.183H4zm4.583 4.442H4V7a.833.833 0 01.833-.833H7.75A.833.833 0 018.583 7v.625zM9.416 7a.833.833 0 01.833-.833h2.918A.833.833 0 0114 7v.625H9.417L9.416 7zm7.083 4.792h-15V8.458h15v3.334z"
        fill="#000"
        fillOpacity={0.5}
      />
    </Svg>
  );
}