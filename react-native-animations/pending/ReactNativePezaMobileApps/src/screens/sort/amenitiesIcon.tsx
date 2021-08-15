import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

import { theme } from '../../components';

export function AirConIcon(props: SvgProps) {
  return (
    <Svg {...props} width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.676 9.2H3.298A3.3 3.3 0 010 5.907a3.298 3.298 0 013.294-3.294H7.32V1.36H6.296A.663.663 0 015.63.696c0-.368.296-.665.665-.665h3.379c.368 0 .665.297.665.665a.663.663 0 01-.665.665H8.652v1.25h4.024a3.298 3.298 0 013.295 3.295 3.296 3.296 0 01-3.295 3.295zm0-5.255H3.298c-1.082 0-1.965.88-1.965 1.961 0 1.082.88 1.962 1.961 1.962h9.382c1.082 0 1.962-.88 1.962-1.962 0-1.081-.88-1.961-1.962-1.961z"
        fill={props.color ? props.color : theme.colors.white}
      />
      <Path
        d="M11.428 13.245a4.874 4.874 0 01-6.882 0c-.368-.368-.812-.13-.942 0a.665.665 0 000 .942 6.203 6.203 0 008.766 0 .665.665 0 10-.942-.942zM10.056 11.873a.665.665 0 10-.942-.942 1.599 1.599 0 01-2.258 0c-.32-.32-.753-.186-.942 0a.665.665 0 000 .942 2.935 2.935 0 004.142 0zM5.68 6.571h4.614a.663.663 0 00.665-.665.663.663 0 00-.665-.664H5.68a.665.665 0 000 1.33z"
        fill={props.color ? props.color : theme.colors.white}
      />
    </Svg>
  );
}
