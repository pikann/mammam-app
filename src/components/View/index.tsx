import * as React from 'react';
import {View as DefaultView, ViewProps} from 'react-native';

import {styles} from './styles';

export default function View(props: ViewProps & {children?: React.ReactNode}) {
  const {style, ...otherProps} = props;
  return (
    <DefaultView
      style={{...styles.view, ...(style as object)}}
      {...otherProps}
    />
  );
}

export function Row(props: ViewProps & {children?: React.ReactNode}) {
  const {style, ...otherProps} = props;
  return (
    <DefaultView
      style={{
        ...styles.row,
        ...(style as object),
      }}
      {...otherProps}
    />
  );
}
