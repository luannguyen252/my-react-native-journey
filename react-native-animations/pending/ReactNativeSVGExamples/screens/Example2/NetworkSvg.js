import React from 'react';
import { SvgUri } from 'react-native-svg';
import { View } from 'react-native';

const NetworkSvg = () => {
  return (
    <View>
      <SvgUri
        height={300}
        width={300}
        uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
      />
      <SvgUri
        height={300}
        width={300}
        uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg"
      />
    </View>
  );
};

export default NetworkSvg;
