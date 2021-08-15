import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  flex: 1;
  background: ${(props) => props.theme.backgroundColor};
`;

export const AnimatedCardView = styled.View`
  margin: 10px 0;
`;
