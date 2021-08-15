import * as React from 'react';
import Svg, { SvgProps, Path, Mask, G } from 'react-native-svg';
import { theme } from '../components';

export function HomeIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 12C1 5.9 5.9 1 12 1s11 4.9 11 11-4.9 11-11 11S1 18.1 1 12zm2 0c0 5 4 9 9 9s9-4 9-9-4-9-9-9-9 4-9 9zm12.9-5.2L9.6 8.9c-.3.1-.6.4-.7.7L6.8 16c-.1.4 0 .8.2 1 .2.2.4.3.7.3.1 0 .2 0 .3-.1l6.4-2.1c.3-.1.5-.3.6-.6l2.1-6.4c.1-.4 0-.8-.2-1-.2-.3-.6-.4-1-.3zm-6.6 7.8l4-1.3 1.3-4-4 1.3-1.3 4z"
        fill={props.color ? props.color : theme.colors.primary}
      />
      <Mask id="prefix__a" x={1} y={1} width={22} height={22}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 12C1 5.9 5.9 1 12 1s11 4.9 11 11-4.9 11-11 11S1 18.1 1 12zm2 0c0 5 4 9 9 9s9-4 9-9-4-9-9-9-9 4-9 9zm12.9-5.2L9.6 8.9c-.3.1-.6.4-.7.7L6.8 16c-.1.4 0 .8.2 1 .2.2.4.3.7.3.1 0 .2 0 .3-.1l6.4-2.1c.3-.1.5-.3.6-.6l2.1-6.4c.1-.4 0-.8-.2-1-.2-.3-.6-.4-1-.3zm-6.6 7.8l4-1.3 1.3-4-4 1.3-1.3 4z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path fill={props.color ? props.color : theme.colors.primary} d="M0 0h24v24H0z" />
      </G>
    </Svg>
  );
}

export function CategoryIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6 12.889l-10-5.006c-.4-.2-.6-.5-.6-.901 0-.4.2-.701.5-.901l10-5.006c.3-.1.6-.1.9 0l10 5.006c.4.2.6.5.6.9 0 .401-.2.702-.6.902l-10 5.006c-.1.1-.2.1-.4.1s-.3 0-.4-.1zm8.2-5.907L12 3.077 4.2 6.982l7.8 3.904 7.8-3.904zm3.1 9.61c.2.501 0 1.102-.4 1.302l-10 5.006c-.2.1-.3.1-.5.1s-.3 0-.4-.1l-10-5.006c-.5-.2-.7-.8-.4-1.301.2-.5.8-.701 1.3-.4l9.6 4.805 9.6-4.806c.3-.3.9-.1 1.2.4zm-.4-3.703c.4-.2.6-.801.4-1.302-.3-.5-.9-.7-1.2-.4l-9.6 4.805-9.6-4.805c-.5-.3-1.1-.1-1.3.4-.3.5-.1 1.101.4 1.302l10 5.005c.1.1.2.1.4.1s.3 0 .5-.1l10-5.005z"
        fill={props.color ? props.color : theme.colors.primary}
      />
      <Mask id="prefix__a" x={1} y={1} width={22} height={22}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6 12.889l-10-5.006c-.4-.2-.6-.5-.6-.901 0-.4.2-.701.5-.901l10-5.006c.3-.1.6-.1.9 0l10 5.006c.4.2.6.5.6.9 0 .401-.2.702-.6.902l-10 5.006c-.1.1-.2.1-.4.1s-.3 0-.4-.1zm8.2-5.907L12 3.077 4.2 6.982l7.8 3.904 7.8-3.904zm3.1 9.61c.2.501 0 1.102-.4 1.302l-10 5.006c-.2.1-.3.1-.5.1s-.3 0-.4-.1l-10-5.006c-.5-.2-.7-.8-.4-1.301.2-.5.8-.701 1.3-.4l9.6 4.805 9.6-4.806c.3-.3.9-.1 1.2.4zm-.4-3.703c.4-.2.6-.801.4-1.302-.3-.5-.9-.7-1.2-.4l-9.6 4.805-9.6-4.805c-.5-.3-1.1-.1-1.3.4-.3.5-.1 1.101.4 1.302l10 5.005c.1.1.2.1.4.1s.3 0 .5-.1l10-5.005z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#prefix__a)">
        <Path fill={props.color ? props.color : theme.colors.lightGrey} d="M0 0h24v24H0z" />
      </G>
    </Svg>
  );
}

export function FavoriteIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G opacity={0.851}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.5 5H20c1.7 0 3 1.3 3 3v11c0 1.7-1.3 3-3 3H4c-1.7 0-3-1.3-3-3V5c0-1.7 1.3-3 3-3h5c.3 0 .6.2.8.4L11.5 5zM20 20c.6 0 1-.4 1-1V8c0-.6-.4-1-1-1h-9c-.3 0-.6-.2-.8-.4L8.5 4H4c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h16z"
          fill={props.color ? props.color : theme.colors.primary}
        />
        <Mask id="prefix__a" x={1} y={2} width={22} height={20}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5 5H20c1.7 0 3 1.3 3 3v11c0 1.7-1.3 3-3 3H4c-1.7 0-3-1.3-3-3V5c0-1.7 1.3-3 3-3h5c.3 0 .6.2.8.4L11.5 5zM20 20c.6 0 1-.4 1-1V8c0-.6-.4-1-1-1h-9c-.3 0-.6-.2-.8-.4L8.5 4H4c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h16z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#prefix__a)">
          <Path fill={props.color ? props.color : theme.colors.primary} d="M0 0h24v24H0z" />
        </G>
      </G>
    </Svg>
  );
}

export function ProfileIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <G opacity={0.8}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 7c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zm14 12v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-1.7-1.3-3-3-3H8c-1.7 0-3 1.3-3 3v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5zm-9-9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
          fill={props.color ? props.color : theme.colors.primary}
        />
        <Mask id="prefix__a" x={3} y={2} width={18} height={20}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 7c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zm14 12v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-1.7-1.3-3-3-3H8c-1.7 0-3 1.3-3 3v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5zm-9-9c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#prefix__a)">
          <Path fill={props.color ? props.color : theme.colors.primary} d="M0 0h24v24H0z" />
        </G>
      </G>
    </Svg>
  );
}
