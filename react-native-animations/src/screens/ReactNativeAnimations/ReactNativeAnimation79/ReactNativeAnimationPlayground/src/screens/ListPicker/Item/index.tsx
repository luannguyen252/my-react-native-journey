import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { Social } from '../data';

import { Container, SocialName, Icon } from './styles';

interface ItemProps {
  social: Social;
  showText: boolean;
  isAccent: boolean;
}

const Item: React.FC<ItemProps> = ({ social, showText, isAccent }) => {
  return (
    <Container>
      {showText ? (
        <SocialName isAccent={isAccent}>{social.name}</SocialName>
      ) : (
        <View />
      )}
      <Icon name={social.icon} size={32} isAccent={isAccent} />
    </Container>
  );
};

export default Item;
