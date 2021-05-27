import React, {memo} from 'react';

import {Pressable, Text} from 'react-native';

const Button = memo(({onPress, Title, style, styleTxt, testID = null}) => {
  return (
    <Pressable onPress={onPress} style={style} testID={testID}>
      <Text style={styleTxt}>{Title}</Text>
    </Pressable>
  );
});

export {Button};
