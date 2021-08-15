import styled from 'styled-components/native';

import { deviceHeight } from '../../constants';
import { CARD_HEIGHT } from '../../components/Card';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.backgroundColor};
  align-items: center;
`;

export const AbsoluteAnimatedView = styled.View`
  position: absolute;
  margin-top: ${deviceHeight / 2 - CARD_HEIGHT}px;
`;
