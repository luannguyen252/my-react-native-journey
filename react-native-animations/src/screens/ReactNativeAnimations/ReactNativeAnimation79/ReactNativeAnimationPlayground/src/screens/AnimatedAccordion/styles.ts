import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.backgroundColor};
`;

interface CardProps {
  background: string;
}
export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<CardProps>`
  flex-grow: 1;
  padding: 0px 25px;
  background: ${(props) => props.background};
  justify-content: center;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface HeadingProps {
  color: string;
}
export const Heading = styled.Text<HeadingProps>`
  color: ${(props) => props.color};
  font-size: 34px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: -1.5px;
`;

export const SubList = styled.View`
  margin-top: 10px;
`;

export const SubText = styled.Text<HeadingProps>`
  color: ${(props) => props.color};
  font-size: 18px;
  line-height: 28px;
`;
