import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${(props) => props.theme.cardBackgroundColor};
  width: 100%;
  flex-direction: row;
`;

export const FooterButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  flex: 1;
  padding: 18px 0;
`;

export const FooterButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.fontColor};
`;

export const Separator = styled.View`
  background: ${(props) => props.theme.detailColor};
  width: 1px;
`;
