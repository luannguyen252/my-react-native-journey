import styled from 'styled-components/native';

import { deviceWidth } from '../../constants';

export const ITEM_WIDTH = deviceWidth * 0.9;
export const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.backgroundColor};
`;

export const PlaceContainer = styled.View`
  position: absolute;
  left: ${-ITEM_WIDTH / 2}px;
  top: ${-ITEM_HEIGHT / 2}px;
`;

export const PlaceImage = styled.Image`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_HEIGHT}px;
  border-radius: 10px;
`;

export const PlaceName = styled.Text`
  position: absolute;
  bottom: 25px;
  left: 25px;
  font-size: 35px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
`;
