import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Touch, Container } from './styles';

interface RoundButtonProps {
  icon: string;
  onPress: () => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({ icon, onPress }) => {
  const { fontColor } = useTheme();

  return (
    <Touch onPress={onPress}>
      <Container>
        <Ionicons name={icon} size={28} color={fontColor} />
      </Container>
    </Touch>
  );
};

export default RoundButton;
