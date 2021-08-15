import styled from 'styled-components/native';
import { transparentize } from 'polished';
import { AntDesign } from '@expo/vector-icons';

import { deviceHeight, deviceWidth } from '../../../constants';

export const ITEM_WIDTH = deviceWidth * 0.7;

export const Container = styled.View`
  background: ${(props) => props.theme.cardBackgroundColor};
  align-self: flex-end;
  padding: 35px 0 30px 0px;
  border-radius: 35px;
  align-items: center;
  justify-content: flex-start;
  width: ${ITEM_WIDTH}px;
`;

export const MoviePoster = styled.Image`
  height: ${deviceHeight * 0.4}px;
  border-radius: 30px;
`;

export const MovieTitle = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color: ${(props) => props.theme.fontColor};
  margin: 14px 0;
  letter-spacing: -0.5px;
`;

export const Genres = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Genre = styled.Text`
  font-size: 12px;
  padding: 4px 12px;
  color: ${(props) => transparentize(0.4, props.theme.fontColor)};
  border-radius: 20px;
  border: 1px;
  border-color: ${(props) => transparentize(0.4, props.theme.fontColor)};
  margin: 0 4px;
`;

export const Stars = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;

export const Star = styled(AntDesign)`
  color: orange;
  margin: 0 2px;
`;
