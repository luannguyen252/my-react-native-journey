import styled, { css } from 'styled-components/native';

const choices = {
  like: {
    container: css`
      border-color: #6ad99e;
    `,
    text: css`
      color: #6ad99e;
    `,
  },
  nope: {
    container: css`
      border-color: #f57676;
    `,
    text: css`
      color: #f57676;
    `,
  },
  'super like': {
    container: css`
      border-color: #03c2fc;
      max-width: 200px;
    `,
    text: css`
      color: #03c2fc;
      text-align: center;
    `,
  },
};

interface ChoiseStyleProps {
  type: 'like' | 'nope' | 'super like';
}

export const Container = styled.View<ChoiseStyleProps>`
  border-width: 5px;
  padding: 0px 20px;
  border-radius: 10px;
  ${(props) => choices[props.type].container}
`;

export const ChoiseText = styled.Text<ChoiseStyleProps>`
  font-size: 40px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
  ${(props) => choices[props.type].text}
`;
