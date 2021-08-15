import React from "react";
import styled from "styled-components";
import { normalize } from "../../utils/normalizeSizes";

const TextStyles = styled.Text`
  color: ${({ color }) => color};
  font-size: ${({ size }) => normalize(size)};
  text-align: center;
`;

const Text = ({ align, size, color, ...props }) => (
  <TextStyles size={size} color={color} {...props} />
);

export default Text;
