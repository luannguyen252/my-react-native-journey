import React from 'react';
import { Animated, ImageSourcePropType } from 'react-native';

import { deviceWidth } from '../../../constants';

import {
  Container,
  ProductImage,
  ProductInfo,
  Heading,
  HeadingLine,
  HeadingText,
  Description,
} from './styles';

interface ItemProps {
  index: number;
  imageUri: ImageSourcePropType;
  heading: string;
  color: string;
  scrollX: Animated.Value;
}

const Item: React.FC<ItemProps> = ({ index, heading, imageUri, scrollX }) => {
  // prev item , curr item, next, item
  const inputRange = [
    (index - 1) * deviceWidth,
    index * deviceWidth,
    (index + 1) * deviceWidth,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  // outputRange is inverted due to the nature of scroll
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [-deviceWidth * 0.2, 0, deviceWidth * 0.2],
  });

  const translateXDesc = scrollX.interpolate({
    inputRange,
    outputRange: [deviceWidth * 0.6, 0, -deviceWidth * 0.6],
  });

  const opacityHeading = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  return (
    <Container>
      <ProductImage
        as={Animated.Image}
        style={{ transform: [{ scale }] }}
        source={imageUri}
        resizeMode="contain"
      />

      <ProductInfo>
        <Heading
          as={Animated.View}
          style={{
            opacity: opacityHeading,
            transform: [{ translateX: translateXHeading }],
          }}>
          <HeadingLine />
          <HeadingText>{heading}</HeadingText>
        </Heading>
        <Description
          as={Animated.Text}
          style={{
            transform: [{ translateX: translateXDesc }],
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          condimentum metus eget velit tempor accumsan
        </Description>
      </ProductInfo>
    </Container>
  );
};

export default Item;
