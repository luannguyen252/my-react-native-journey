import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import Text from "../Text";

const NavigationSampleStyles = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

const NavigationSample = (props) => (
  <NavigationSampleStyles {...props}>
    <TouchableOpacity>
      <Text color="white"></Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text color="white"></Text>
    </TouchableOpacity>
  </NavigationSampleStyles>
);

export default NavigationSample;
