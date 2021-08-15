import React, { ReactNode, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Box, theme, Text } from '..';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: theme.constants.screenWidth,
  },
  amenity: {
    width: 95,
    height: 48,
    backgroundColor: theme.colors.white,
    marginHorizontal: 12,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 16,
  },
});

type Item = {
  id: number;
  value: string;
  icon?: ReactNode;
  icon2?: ReactNode;
};

interface Props {
  items: Item[];
  setSelection: (array: string[] | string | any) => void;
  multiple?: boolean;
}

const Multiselect = ({ items, setSelection, multiple }: Props) => {
  const [array, setArray] = useState<string[]>([]);
  const [single, setSingle] = useState<string>();

  const checkIfExists = (arr: string[], value: string) => {
    if (arr.includes(value)) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromArray = (arr: string[], value: string) => {
    const result = arr.filter((v) => {
      return v !== value;
    });
    setArray(result);
    setSelection(result);
    return;
  };

  const addToArray = (arr: string[], value: string) => {
    const newArr = [...array, value];
    setArray(newArr);
    setSelection(newArr);
  };

  const handleMultiselect = (value: string) => {
    const isInArray = checkIfExists(array, value);
    if (isInArray) {
      removeFromArray(array, value);
    } else {
      addToArray(array, value);
    }
  };

  const handleSingleSelect = (value: string) => {
    if (single === value) {
      setSingle('');
      setSelection('');
    } else {
      setSingle(value);
      setSelection(value);
    }
  };

  const returnBgColor = (value: string) => {
    if (multiple) {
      const isInArray = checkIfExists(array, value);
      if (isInArray) {
        return theme.colors.primary;
      } else {
        return theme.colors.white;
      }
    } else {
      if (single === value) {
        return theme.colors.primary;
      } else {
        return theme.colors.white;
      }
    }
  };

  const returnTextColor = (value: string) => {
    if (multiple) {
      const isInArray = checkIfExists(array, value);
      if (isInArray) {
        return theme.colors.white;
      } else {
        return theme.colors.dark;
      }
    } else {
      if (single === value) {
        return theme.colors.white;
      } else {
        return theme.colors.dark;
      }
    }
  };

  return (
    <Box style={styles.container}>
      {items.map((a: Item) => (
        <TouchableOpacity
          onPress={() => {
            if (multiple) {
              handleMultiselect(a.value);
            } else {
              handleSingleSelect(a.value);
            }
          }}
          key={a.id}
          style={[
            styles.amenity,
            {
              backgroundColor: returnBgColor(a.value),
            },
          ]}>
          <Text variant="b1" textAlign="center" style={{ color: returnTextColor(a.value) }}>
            {a.value}
          </Text>
        </TouchableOpacity>
      ))}
    </Box>
  );
};

export default Multiselect;
