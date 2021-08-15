import React from 'react';
import { SvgXml, SvgWithCss } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

const xml = `
  <svg width="32" height="32" viewBox="0 0 32 32">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      fill="url(#gradient)"
      d="M4 0C1.79086 0 0 1.79086 0 4V28C0 30.2091 1.79086 32 4 32H28C30.2091 32 32 30.2091 32 28V4C32 1.79086 30.2091 0 28 0H4ZM17 6C17 5.44772 17.4477 5 18 5H20C20.5523 5 21 5.44772 21 6V25C21 25.5523 20.5523 26 20 26H18C17.4477 26 17 25.5523 17 25V6ZM12 11C11.4477 11 11 11.4477 11 12V25C11 25.5523 11.4477 26 12 26H14C14.5523 26 15 25.5523 15 25V12C15 11.4477 14.5523 11 14 11H12ZM6 18C5.44772 18 5 18.4477 5 19V25C5 25.5523 5.44772 26 6 26H8C8.55228 26 9 25.5523 9 25V19C9 18.4477 8.55228 18 8 18H6ZM24 14C23.4477 14 23 14.4477 23 15V25C23 25.5523 23.4477 26 24 26H26C26.5523 26 27 25.5523 27 25V15C27 14.4477 26.5523 14 26 14H24Z"
    />
    <defs>
      <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="8.46631"
        y2="37.3364"
        gradient-units="userSpaceOnUse">
        <stop offset="0" stop-color="#FEA267" />
        <stop offset="1" stop-color="#E75A4C" />
      </linearGradient>
    </defs>
  </svg>
`;

const xmlWithCss = `
  <svg width="32" height="32" viewBox="0 0 32 32">
    <style>
      .rectangle {
        fill: green;
      }
    </style>
    <rect class="rectangle" x="0" y="0" width="32" height="32" />
  </svg>
`;

const filterExample = `
<svg width="500" height="100">
  <defs>
    <filter id="blurFilter3" y="-10" height="40" x="-10" width="150">
      <feOffset in="SourceAlpha" dx="3" dy="3" result="offset3" />
      <feGaussianBlur in="offset3" stdDeviation="3" result="blur3" />

      <feBlend in="SourceGraphic" in2="blur3" x="-10" width="160" />

    </filter>
  </defs>
  <ellipse cx="55" cy="60" rx="25" ry="15" style="stroke: none; fill: #0000ff;
                filter: url(#blurFilter3);" />
</svg>`;

const XmlSvg = () => {
  return (
    <View style={styles.container}>
      <SvgXml xml={xml} width="64" height="64" />
      <SvgWithCss xml={xmlWithCss} width="64" height="64" />
      <SvgXml xml={filterExample} width="64" height="64" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default XmlSvg;
