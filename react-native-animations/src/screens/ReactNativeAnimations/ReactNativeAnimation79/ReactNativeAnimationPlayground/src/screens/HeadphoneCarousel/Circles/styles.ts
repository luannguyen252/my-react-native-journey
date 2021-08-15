import styled from 'styled-components/native';

import { deviceHeight, deviceWidth } from '../../../constants';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

interface CircleProps {
  color: string;
}
export const Circle = styled.View<CircleProps>`
  width: ${deviceWidth * 0.65}px;
  height: ${deviceWidth * 0.65}px;
  border-radius: 300px;
  position: absolute;
  top: ${deviceHeight * 0.1}px;
  left: ${deviceWidth * 0.17}px;
  background: ${(props) => props.color};
`;
