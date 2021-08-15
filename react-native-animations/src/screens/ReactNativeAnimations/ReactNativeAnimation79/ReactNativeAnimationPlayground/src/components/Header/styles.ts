import styled from 'styled-components/native';
import { StatusBar } from 'react-native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(StatusBar?.currentHeight ?? 24) + 8}px 16px 10px 16px;
  background: ${(props) => props.theme.backgroundColor};
  border-bottom-color: ${(props) => props.theme.detailColor};
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.fontColor};
`;

export const RightItems = styled.View`
  flex-direction: row;
`;

export const BackArrowContainer = styled.View`
  margin-right: 12px;
`;

export const Separator = styled.View`
  width: 10px;
`;
