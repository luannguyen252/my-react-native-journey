import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

export function FindAgent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M17.334 4H6.667a4 4 0 00-4 4v16a4 4 0 004 4h10.667a4 4 0 004-4V8a4 4 0 00-4-4z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M10.574 8.79l.827 2.48c.071.244.071.503 0 .747l-1.907 7.716a1.333 1.333 0 00.253 1.16l2 2.44a.334.334 0 00.52 0l2-2.453a1.333 1.333 0 00.267-1.147L12.707 12a1.334 1.334 0 010-.72l.827-2.48a.334.334 0 00-.32-.44h-2.32a.333.333 0 00-.32.427v.003zM28.974 22.96a1.227 1.227 0 01-1.8-.08l-4.32-5.107.947-.947 5.107 4.32a1.227 1.227 0 01.067 1.813h-.001z"
        fill="#3152D6"
      />
      <Path
        opacity={0.24}
        d="M23.321 17.311a4.667 4.667 0 10-6.6-6.6 4.667 4.667 0 006.6 6.6z"
        fill="#fff"
      />
      <Path
        d="M17.187 11.187a4 4 0 115.661 5.654 4 4 0 01-5.661-5.654zm-.947-.947a5.333 5.333 0 107.546 7.538 5.333 5.333 0 00-7.546-7.538z"
        fill="#3152D6"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={12.001}
          y1={4}
          x2={12.001}
          y2={28}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E6E8FF" />
          <Stop offset={1} stopColor="#ABADEB" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
