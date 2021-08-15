import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function ProfileSvg(props: SvgProps) {
  return (
    <Svg width={225} height={94} viewBox="0 0 225 94" fill="none" {...props}>
      <Path
        opacity={0.146}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M192.5 45c12.426 0 22.5-10.074 22.5-22.5S204.926 0 192.5 0 170 10.074 170 22.5 180.074 45 192.5 45z"
        fill="#181059"
      />
      <Path
        opacity={0.146}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M56.5 94C70.583 94 82 82.583 82 68.5S70.583 43 56.5 43 31 54.417 31 68.5 42.417 94 56.5 94z"
        fill="#8645FF"
      />
      <Path
        opacity={0.146}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M210.5 29c8.008 0 14.5-6.492 14.5-14.5S218.508 0 210.5 0 196 6.492 196 14.5 202.492 29 210.5 29zM146.5 80c5.799 0 10.5-4.701 10.5-10.5S152.299 59 146.5 59 136 63.701 136 69.5 140.701 80 146.5 80z"
        fill="#FDCA00"
      />
      <Path
        opacity={0.146}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 51c7.732 0 14-6.268 14-14s-6.268-14-14-14S0 29.268 0 37s6.268 14 14 14z"
        fill="#181059"
      />
    </Svg>
  );
}

export default ProfileSvg;
