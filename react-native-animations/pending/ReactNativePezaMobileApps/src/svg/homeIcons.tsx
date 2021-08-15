import * as React from 'react';
import Svg, { SvgProps, Path, G, Mask } from 'react-native-svg';

export function HeaderIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path d="M0 4a4 4 0 118 0v4H4a4 4 0 01-4-4z" fill="#8645FF" />
      <Path
        d="M20 4a4 4 0 00-8 0v4h4a4 4 0 004-4zM0 16a4 4 0 008 0v-4H4a4 4 0 00-4 4zM20 16a4 4 0 01-8 0v-4h4a4 4 0 014 4z"
        fill="#181059"
      />
    </Svg>
  );
}

export function SearchIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G opacity={0.599}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.2 15.8l4.5 4.5c.4.4.4 1 0 1.4-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3l-4.5-4.5c-1.5 1.1-3.3 1.8-5.3 1.8C5.8 19 2 15.2 2 10.5S5.8 2 10.5 2 19 5.8 19 10.5c0 2-.7 3.9-1.8 5.3zM10.5 4C6.9 4 4 6.9 4 10.5S6.9 17 10.5 17c1.8 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.8 1.9-4.6C17 6.9 14.1 4 10.5 4z"
          fill="#000"
        />
        <Mask id="prefix__a" x={2} y={2} width={20} height={20}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.2 15.8l4.5 4.5c.4.4.4 1 0 1.4-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3l-4.5-4.5c-1.5 1.1-3.3 1.8-5.3 1.8C5.8 19 2 15.2 2 10.5S5.8 2 10.5 2 19 5.8 19 10.5c0 2-.7 3.9-1.8 5.3zM10.5 4C6.9 4 4 6.9 4 10.5S6.9 17 10.5 17c1.8 0 3.4-.7 4.6-1.9 1.2-1.2 1.9-2.8 1.9-4.6C17 6.9 14.1 4 10.5 4z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#prefix__a)">
          <Path fill="#9E9E9E" d="M0 0h24v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export function CardActiveDots(props: SvgProps) {
  return (
    <Svg width={46} height={28} viewBox="0 0 46 28" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.162 19a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        fill="#FDCA00"
      />
      <Path
        opacity={0.634}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.913 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        fill="#8645FF"
      />
      <Path
        opacity={0.346}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.906 28a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        fill="#8645FF"
      />
      <Path
        opacity={0.173}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.357 5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        fill="#8645FF"
      />
      <Path
        opacity={0.624}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.868 28a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
        fill="#8645FF"
      />
    </Svg>
  );
}
