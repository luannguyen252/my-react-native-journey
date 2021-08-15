import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

export function HomeLoans(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M26.746 4.334l-.08 21.333H5.333v-16l5.333-5.333h16.08z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M3.133 12.8l-.933-.933 8.187-8.2h18.946V5H10.95l-7.817 7.8z"
        fill="#3152D6"
      />
      <Path d="M14 10.334h-4v4h4v-4z" fill="#3152D6" />
      <Path
        d="M22.667 27.667a6 6 0 100-12 6 6 0 000 12z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M22.667 16.333a5.333 5.333 0 110 10.666 5.333 5.333 0 010-10.666zm0-1.333a6.666 6.666 0 100 13.333 6.666 6.666 0 000-13.333z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M22.147 18.507v.427h-.107a1.16 1.16 0 00-1.16 1.16v.773a1.16 1.16 0 00.88 1.12l1.573.387a.093.093 0 01.08.093v.773a.107.107 0 01-.107.107H22.04a.107.107 0 01-.107-.107v-.456a.173.173 0 00-.173-.173h-.707a.173.173 0 00-.173.173v.453a1.16 1.16 0 001.16 1.16h.107v.427a.173.173 0 00.173.173h.707a.173.173 0 00.173-.173v-.427h.107a1.16 1.16 0 001.16-1.16v-.773a1.16 1.16 0 00-.88-1.12l-1.573-.387a.093.093 0 01-.08-.093v-.77a.107.107 0 01.107-.107h1.267a.107.107 0 01.107.107v.453a.173.173 0 00.173.173h.707a.173.173 0 00.173-.173v-.453a1.16 1.16 0 00-1.16-1.16H23.2v-.427a.173.173 0 00-.173-.173h-.707a.173.173 0 00-.173.173z"
        fill="url(#prefix__paint3_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={16.04}
          y1={4.334}
          x2={16.04}
          y2={25.667}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E6E8FF" />
          <Stop offset={1} stopColor="#ABADEB" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={22.667}
          y1={15.667}
          x2={22.667}
          y2={27.667}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3337A5" />
          <Stop offset={1} stopColor="#B7B9FF" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={22.667}
          y1={15}
          x2={22.667}
          y2={28.334}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E6E8FF" />
          <Stop offset={1} stopColor="#ABADEB" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={22.674}
          y1={18.334}
          x2={22.674}
          y2={24.997}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E6E8FF" />
          <Stop offset={1} stopColor="#ABADEB" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
