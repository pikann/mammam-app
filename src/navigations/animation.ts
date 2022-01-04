import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {verticalSlide} from '../utils/navigationsAnimation';

export const config = {
  animation: 'timing',
  config: {
    duration: 500,
  },
} as TransitionSpec;

export const verticalSlideOption = {
  headerShown: false,
  cardStyleInterpolator: verticalSlide,
  transitionSpec: {
    open: config,
    close: config,
  },
};

export const horizontalIOSOption = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  transitionSpec: {
    open: config,
    close: config,
  },
};

export const verticalIOSOption = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  transitionSpec: {
    open: config,
    close: config,
  },
};
