import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';

import { Box, Text } from '../Theme';
import { Feather as Icon } from '@expo/vector-icons';

interface CheckboxProps {
  label: string;
}

const Checkbox = ({ label }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <RectButton
      onPress={() => setChecked((c) => !c)}
      style={{ justifyContent: 'center' }}
    >
      <Box flexDirection="row" alignItems="center">
        <Box
          marginRight="s" // Normally 'm'
          height={20}
          width={20}
          borderRadius="s"
          alignItems="center"
          justifyContent="center"
          borderWidth={1}
          borderColor="primary"
          backgroundColor={checked ? 'primary' : 'white'}
        >
          <Icon name="check" color="white" />
        </Box>
        <Text variant="button">{label}</Text>
      </Box>
    </RectButton>
  );
};

export default Checkbox;
