// Inspiration: https://interfacemarket.com/ui-kits/boston-grocery-delivery-app-ui-kit

import React, { useState, useRef, useCallback } from 'react';
import { Transition, Transitioning } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';

import { Container, Card, Header, Heading, SubList, SubText } from './styles';
import { categories } from './data';

const transition = (
  <Transition.Change durationMs={400} interpolation="easeInOut" />
);

const AnimatedAccordion: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const transitionRef = useRef(null);

  const toggleAccordion = useCallback(
    (index) => {
      transitionRef.current?.animateNextTransition();
      setSelectedIndex(index === selectedIndex ? null : index);
    },
    [selectedIndex, setSelectedIndex],
  );

  return (
    <Container
      as={Transitioning.View}
      ref={transitionRef}
      transition={transition}>
      {categories.map(({ category, subCategories, bg, color }, index) => {
        return (
          <Card
            key={category}
            background={bg}
            onPress={() => toggleAccordion(index)}>
            <Header>
              <Heading color={color}>{category}</Heading>
              <Entypo
                name="chevron-down"
                size={30}
                color={color}
                style={{
                  transform: [
                    { rotate: index === selectedIndex ? '180deg' : '0deg' },
                  ],
                }}
              />
            </Header>
            {index === selectedIndex && (
              <SubList>
                {subCategories.map((subcategory) => (
                  <SubText key={subcategory} color={color}>
                    {subcategory}
                  </SubText>
                ))}
              </SubList>
            )}
          </Card>
        );
      })}
    </Container>
  );
};

export default AnimatedAccordion;
