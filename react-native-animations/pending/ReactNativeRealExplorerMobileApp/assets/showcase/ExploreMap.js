import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

export function ExploreMap(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 25.974l-8.666 2.48v-14.44a1.987 1.987 0 011.44-1.92L12 10.029l8 2.667 7.84-2.24H28a.654.654 0 01.667.667v14.545a.693.693 0 01-.493.64l-8.173 2.333L12 25.974z"
        fill="#E1E3FF"
      />
      <Path
        d="M12 10.668l7.613 2.533.387.134.4-.12 7.6-2.107v14.56L20 28l-7.613-2.533-.387-.133-.4.107-3.733 1.066h-.094L4 27.574v-13.56a1.333 1.333 0 01.973-1.332L12 10.668zm0-1.333l-7.4 2.12a2.667 2.667 0 00-1.933 2.56v14.44a.667.667 0 00.667.667h.186l4.653-1.333h.094L12 26.669l8 2.667 8.36-2.387a1.333 1.333 0 00.973-1.333V11.108a1.332 1.332 0 00-1.334-1.333 1.653 1.653 0 00-.36 0l-7.64 2.227L12 9.335z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path d="M8.266 27.734l-.04.067-.053-.04.093-.027z" fill="#61A0AA" />
      <Path
        d="M21.733 5.042a8.108 8.108 0 00-11.466 11.466l4.133 4.147a2.267 2.267 0 003.2 0l4.133-4.147a8.105 8.105 0 000-11.466zM16 13.535a3.347 3.347 0 11.021-6.694A3.347 3.347 0 0116 13.535z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M16 13.536a3.354 3.354 0 003.36-3.347A3.354 3.354 0 0016 6.842a3.354 3.354 0 00-3.36 3.347A3.354 3.354 0 0016 13.536z"
        fill="#F2F3FF"
      />
      <Path
        d="M16 13.036c1.58 0 2.86-1.275 2.86-2.847A2.854 2.854 0 0016 7.342a2.854 2.854 0 00-2.86 2.847A2.854 2.854 0 0016 13.036z"
        stroke="#3152D6"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={16}
          y1={9.335}
          x2={16}
          y2={29.336}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E6E8FF" />
          <Stop offset={1} stopColor="#ABADEB" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={16.025}
          y1={2.717}
          x2={16.025}
          y2={21.316}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3337A5" />
          <Stop offset={1} stopColor="#B7B9FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
