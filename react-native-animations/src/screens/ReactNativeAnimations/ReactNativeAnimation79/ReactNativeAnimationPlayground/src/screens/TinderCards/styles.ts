import styled from 'styled-components/native';

import { deviceWidth, deviceHeight } from '../../constants';

export const CARD_WIDTH = deviceWidth * 0.9;
export const CARD_HEIGHT = deviceHeight * 0.7;

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.backgroundColor};
  align-items: center;
`;

export const Card = styled.View`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 8px;
  elevation: 6;
  position: absolute;
  top: ${deviceHeight * 0.02}px;
`;

export const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const Footer = styled.View`
  height: 90px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 260px;
  position: absolute;
  top: ${deviceHeight * 0.72}px;
`;

interface RoundButtonProps {
  type?: 'small';
}

export const RoundButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.65,
})<RoundButtonProps>`
  width: ${(props) => (props.type === 'small' ? 45 : 60)}px;
  height: ${(props) => (props.type === 'small' ? 45 : 60)}px;
  border-radius: 100px;
  elevation: 4;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.cardBackgroundColor};
`;

export const Like = styled.View`
  position: absolute;
  top: 60px;
  left: 20px;
  transform: rotate(-30deg);
  z-index: 2;
`;

export const Nope = styled.View`
  position: absolute;
  top: 60px;
  right: 20px;
  transform: rotate(30deg);
  z-index: 2;
`;

export const SuperLike = styled.View`
  position: absolute;
  bottom: 60px;
  z-index: 2;
  left: ${CARD_WIDTH / 5}px;
`;
