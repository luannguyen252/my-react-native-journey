import styled from 'styled-components/native';
import { transparentize } from 'polished';

import { deviceWidth, deviceHeight } from '../../../constants';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  width: ${deviceWidth}px;
  height: ${deviceHeight}px;
`;

export const ProductImage = styled.Image`
  width: ${deviceWidth * 0.8}px;
  flex: 1.3;
`;

export const ProductInfo = styled.View`
  width: ${deviceWidth * 0.8}px;
  flex: 1;
  margin-top: -100px;
`;

export const Heading = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const HeadingLine = styled.View`
  width: 40px;
  height: 1.5px;
  background: ${(props) => transparentize(0.35, props.theme.fontColor)};
  margin-right: 8px;
`;

export const HeadingText = styled.Text`
  flex: 1;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.fontColor};
`;

export const Description = styled.Text`
  font-size: 16px;
  color: ${(props) => transparentize(0.35, props.theme.fontColor)};
  line-height: 24px;
`;
