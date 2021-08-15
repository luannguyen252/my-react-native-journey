import styled from 'styled-components/native';
import { transparentize } from 'polished';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Touch = styled(TouchableOpacity)``;

export const Container = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background: ${(props) => transparentize(0.92, props.theme.fontColor)};
`;
