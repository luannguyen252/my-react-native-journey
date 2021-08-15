import styled from 'styled-components/native';

export const TICKER_HEIGHT = 40;

export const Container = styled.View`
  position: absolute;
  top: 15px;
  left: 30px;
  height: ${TICKER_HEIGHT}px;
  overflow: hidden;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Name = styled.Text`
  font-size: 28px;
  font-weight: bold;
  line-height: ${TICKER_HEIGHT}px;
  letter-spacing: 1.2px;
  color: ${(props) => props.theme.fontColor};
  text-transform: uppercase;
`;

export const NameList = styled.View``;
