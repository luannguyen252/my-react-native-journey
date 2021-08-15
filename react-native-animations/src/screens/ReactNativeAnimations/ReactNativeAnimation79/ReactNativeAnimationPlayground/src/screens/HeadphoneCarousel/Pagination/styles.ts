import styled from 'styled-components/native';
import { transparentize } from 'polished';

import { deviceHeight } from '../../../constants';

export const DOT_SIZE = 18;
export const DOT_MARGIN = 18;

export const Container = styled.View`
  position: absolute;
  bottom: ${deviceHeight * 0.08}px;
  right: 20px;
  flex-direction: row;
`;

interface DotProps {
  color: string;
}
export const Dot = styled.View<DotProps>`
  background: ${(props) => props.color};
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: ${DOT_SIZE / 2}px;
  margin-left: 18px;
`;

export const Indicator = styled.View`
  position: absolute;
  left: 9px;
  top: -9px;
  width: ${DOT_SIZE * 2}px;
  height: ${DOT_SIZE * 2}px;
  border-radius: ${DOT_SIZE * 2}px;
  border: 1px;
  border-color: ${(props) => transparentize(0.7, props.theme.fontColor)};
`;
