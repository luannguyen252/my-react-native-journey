import styled from 'styled-components/native';

interface CardImageProps {
  width: number;
  height: number;
}

export const CardImage = styled.Image<CardImageProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
`;
