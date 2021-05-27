import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import Input, { inputStyles } from './Input';

import i18n from '../../i18n';


const InputMoney = ({ style, title, onChangeText, value }) => {
  const {
    textInputStyle
  } = inputStyles;

  return (
    <Input style={style} title={title}>
      <TextInputMask
        style={textInputStyle}
        type={'money'}
        options={{
          separator: i18n.t('app.formatter.numberSeparator'),
          delimiter: i18n.t('app.formatter.numberDelimiter'),
          unit: i18n.t('app.formatter.unit')
        }}
        onChangeText={onChangeText}
        value={value}
        keyboardType={'numeric'}
        clearButtonMode={'always'}
      />
    </Input>
  );
};

export { InputMoney };
