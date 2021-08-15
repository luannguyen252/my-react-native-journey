import React from 'react';

import { Container, ChoiseText } from './styles';

interface ChoiseProps {
  type: 'like' | 'nope' | 'super like';
}

const Choise: React.FC<ChoiseProps> = ({ type }) => {
  return (
    <Container type={type}>
      <ChoiseText type={type}>{type}</ChoiseText>
    </Container>
  );
};

export default Choise;
