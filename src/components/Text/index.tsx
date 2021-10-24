import * as React from 'react';
import {Text as DefaultText, TextProps} from 'react-native';

import {styles} from './styles';

export default function Text(props: TextProps & {children: string}) {
  const {style, ...otherProps} = props;
  return (
    <DefaultText
      style={{
        ...styles.text,
        ...(style as object),
      }}
      {...otherProps}
    />
  );
}
