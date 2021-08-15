import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

import { deviceWidth, deviceHeight } from '../../../constants';

export const BACKDROP_HEIGHT = deviceHeight * 0.6;

export const Container = styled.View`
  position: absolute;
  width: ${deviceWidth}px;
  height: ${BACKDROP_HEIGHT}px;
`;

export const Poster = styled.Image`
  width: ${deviceWidth}px;
  height: ${BACKDROP_HEIGHT}px;
  position: absolute;
`;

export const BottomGradient = styled(LinearGradient).attrs((props) => ({
  colors: ['rgba(0,0,0,0)', props.theme.cardBackgroundColor],
}))`
  width: ${deviceWidth}px;
  height: ${BACKDROP_HEIGHT}px;
  position: absolute;
  bottom: 0;
`;
