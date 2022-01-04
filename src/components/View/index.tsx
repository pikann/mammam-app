import * as React from 'react';
import {
  TouchableWithoutFeedback,
  View as DefaultView,
  ViewProps,
} from 'react-native';

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

export function DoublePressView(
  props: ViewProps & {children?: React.ReactNode} & {onDoublePress: () => void},
) {
  const [lastPress, setLastPress] = React.useState(0);
  const {style, onDoublePress, ...otherProps} = props;
  return (
    <TouchableWithoutFeedback
      style={{...styles.view, ...(style as object)}}
      onPress={() => {
        if (Date.now() - lastPress < 1000) {
          onDoublePress();
          setLastPress(0);
        } else {
          setLastPress(Date.now());
        }
      }}
      {...otherProps}
    />
  );
}
