import React from 'react';
import {TextInput as DefaultTextInput, TextInputProps} from 'react-native';
import Colors from '../../constants/Colors';

import {styles} from './styles';

export default function TextInput(props: TextInputProps) {
  const {style, ...otherProps} = props;
  return (
    <DefaultTextInput
      style={{...styles.textInput, ...(style as object)}}
      placeholderTextColor={Colors.textGray}
      {...otherProps}
    />
  );
}
