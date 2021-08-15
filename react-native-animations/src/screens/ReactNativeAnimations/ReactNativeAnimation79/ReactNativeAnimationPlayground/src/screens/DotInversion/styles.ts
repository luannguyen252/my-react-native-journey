import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.backgroundColor};
  justify-content: flex-end;
  align-items: center;
  padding: 100px;
`;

export const CurrentBackgroundColor = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Circle = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;
