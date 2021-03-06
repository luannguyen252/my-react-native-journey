import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

export function BlogAndNews(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M23.453 28.547a2.667 2.667 0 01-.786-1.88V5.334A2.667 2.667 0 0020 2.667H6.667A2.667 2.667 0 004 5.334v21.333a2.667 2.667 0 002.667 2.667h18.666a2.667 2.667 0 01-1.88-.787zM8.787 9.08a3.173 3.173 0 001.626-1.586.28.28 0 01.507 0 3.173 3.173 0 001.587 1.587.28.28 0 010 .507 3.173 3.173 0 00-1.587 1.586.28.28 0 01-.507 0 3.173 3.173 0 00-1.586-1.587.28.28 0 010-.507h-.04zM14 23.667a.333.333 0 01-.333.333H9a.333.333 0 01-.333-.333V23A.333.333 0 019 22.667h4.667A.333.333 0 0114 23v.667zm4-4a.333.333 0 01-.333.333H9a.333.333 0 01-.333-.333V19A.333.333 0 019 18.667h8.667A.333.333 0 0118 19v.667zm0-4a.333.333 0 01-.333.333H9a.333.333 0 01-.333-.333V15A.333.333 0 019 14.667h8.667A.333.333 0 0118 15v.667zm-.08-6.2a1.507 1.507 0 00-.787.787.148.148 0 01-.133.085.148.148 0 01-.134-.085 1.507 1.507 0 00-.786-.787.147.147 0 010-.267c.353-.152.635-.434.787-.787a.148.148 0 01.213-.062.148.148 0 01.054.062c.152.353.434.635.787.787a.147.147 0 010 .267h-.001z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M8.917 24a.25.25 0 01-.25-.25v-.833a.25.25 0 01.25-.25h4.833a.25.25 0 01.25.25v.834a.25.25 0 01-.25.249H8.917zm0-4a.251.251 0 01-.25-.25v-.833a.25.25 0 01.25-.25h8.833a.25.25 0 01.25.25v.833a.25.25 0 01-.25.25H8.917zm0-4a.25.25 0 01-.25-.249v-.834a.25.25 0 01.25-.249h8.833a.25.25 0 01.25.249v.834a.25.25 0 01-.25.249H8.917zm1.5-4.827A3.175 3.175 0 008.83 9.587a.281.281 0 01-.161-.253.28.28 0 01.161-.253 3.177 3.177 0 001.587-1.587.278.278 0 01.506 0 3.175 3.175 0 001.586 1.587.28.28 0 010 .506 3.173 3.173 0 00-1.586 1.586.281.281 0 01-.509.001l.003-.001zm6.453-.92a1.511 1.511 0 00-.788-.787.145.145 0 01-.085-.133.147.147 0 01.085-.134c.353-.152.635-.434.788-.787a.143.143 0 01.133-.085.144.144 0 01.133.085c.152.353.434.634.787.787a.148.148 0 01.062.213.146.146 0 01-.062.054 1.51 1.51 0 00-.787.787.145.145 0 01-.133.086.145.145 0 01-.137-.085l.004-.001z"
        fill="#3152D6"
      />
      <Path
        d="M28 17.334v9.333a2.669 2.669 0 01-3.7 2.51 2.668 2.668 0 01-1.633-2.51v-12h2.667A2.667 2.667 0 0128 17.334z"
        fill="url(#prefix__paint1_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={14.666}
          y1={2.667}
          x2={14.666}
          y2={29.334}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E6E8FF" />
          <Stop offset={1} stopColor="#ABADEB" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={25.334}
          y1={29.386}
          x2={25.334}
          y2={14.667}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3337A5" />
          <Stop offset={1} stopColor="#B7B9FF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
