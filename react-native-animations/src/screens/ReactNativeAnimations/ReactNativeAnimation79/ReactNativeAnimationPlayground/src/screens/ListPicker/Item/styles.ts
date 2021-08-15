import { SimpleLineIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { accentColor } from '../styles';

export const ITEM_HEIGHT = 42 * 2;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${ITEM_HEIGHT}px;
`;

interface StyleProps {
  isAccent: boolean;
}

export const SocialName = styled.Text<StyleProps>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) =>
    props.isAccent ? accentColor : props.theme.backgroundColor};
`;

export const Icon = styled(SimpleLineIcons)<StyleProps>`
  color: ${(props) =>
    props.isAccent ? accentColor : props.theme.backgroundColor};
`;
