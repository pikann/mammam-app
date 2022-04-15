import * as React from 'react';
import {
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  View as DefaultView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

import Colors from '../../constants/Colors';
import Text from '../Text';
import {styles} from './styles';

export default function Button(
  props: TouchableHighlightProps & {
    children?: React.ReactNode | string;
    textChildrenStyle?: TextStyle | undefined;
    loading?: boolean;
  },
) {
  const {style, children, textChildrenStyle, loading, ...otherProps} = props;
  return (
    <TouchableHighlight
      style={{
        ...styles.button,
        ...(style as object),
      }}
      disabled={loading}
      {...otherProps}>
      {typeof children === 'string' ? (
        loading ? (
          <FastImage
            source={require('../../assets/images/white-loading.gif')}
            style={styles.loading}
          />
        ) : (
          <DefaultView style={styles.flex}>
            <Text
              style={{
                ...styles.textStyleButton,
                ...textChildrenStyle,
              }}>
              {children}
            </Text>
          </DefaultView>
        )
      ) : (
        children
      )}
    </TouchableHighlight>
  );
}

export function BackButton(
  props: TouchableHighlightProps & {colorIcon?: string},
) {
  const {style, colorIcon, ...otherProps} = props;
  return (
    <TouchableHighlight
      style={{
        ...styles.backButton,
        ...(style as object),
      }}
      underlayColor="transparent"
      {...otherProps}>
      <Icon
        name="arrow-back"
        color={colorIcon ? colorIcon : Colors.text}
        size={25}
      />
    </TouchableHighlight>
  );
}

export function TextButton(
  props: TouchableHighlightProps & {
    children: string;
    textStyle?: TextStyle | undefined;
  },
) {
  const {style, children, textStyle, ...otherProps} = props;
  return (
    <TouchableHighlight
      style={{
        ...styles.textButton,
        ...(style as object),
      }}
      underlayColor="transparent"
      {...otherProps}>
      <DefaultView style={styles.flex}>
        <Text
          style={{
            ...textStyle,
            ...styles.flex,
          }}>
          {children}
        </Text>
      </DefaultView>
    </TouchableHighlight>
  );
}

export function IconButton(
  props: TouchableHighlightProps & {name: string; color: string; size: number},
) {
  const {style, name, color, size, ...otherProps} = props;
  return (
    <TouchableHighlight
      style={{
        ...styles.backButton,
        ...(style as object),
      }}
      underlayColor="transparent"
      {...otherProps}>
      <Icon style={styles.center} name={name} color={color} size={size} />
    </TouchableHighlight>
  );
}
