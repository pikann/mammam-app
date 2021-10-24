import React from 'react';
import {TextInput as DefaultTextInput, TextInputProps} from 'react-native';

import {styles} from './styles';

export default function TextInput(props: TextInputProps) {
  const {style, ...otherProps} = props;
  return (
    <DefaultTextInput
      style={{...styles.textInput, ...(style as object)}}
      {...otherProps}
    />
  );
}
