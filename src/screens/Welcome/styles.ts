import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  appName: {
    fontFamily: 'OleoScript-Bold',
    fontSize: 42,
    alignSelf: 'center',
    marginTop: 20,
  },
  description: {
    fontFamily: 'Abel-Regular',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 10,
  },
  logo: {
    width: 93,
    height: 93,
    alignSelf: 'center',
    marginTop: 0.3 * height,
  },
  decorateCircle: {
    backgroundColor: Colors.primary,
    position: 'absolute',
  },
  decorateCircle1: {
    width: 0.8 * width,
    height: 0.8 * width,
    borderRadius: 0.4 * width,
    top: -0.4 * width,
    left: 0.55 * width,
  },
  decorateCircle2: {
    width: width,
    height: width,
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 36,
    marginTop: 30,
    marginLeft: 40,
  },
  welcomeDescription: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 40,
  },
  signInButton: {
    width: 0.36 * width,
    marginTop: 0.275 * width - 77.5,
    marginLeft: 40,
  },
  signUpButton: {
    backgroundColor: Colors.background,
    width: 0.36 * width,
    marginTop: 0.275 * width - 77.5,
    marginLeft: 0.28 * width - 80,
  },
  signUpButtonText: {
    color: Colors.text,
  },
});
