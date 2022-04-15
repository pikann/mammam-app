import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  topRow: {
    marginTop: 35,
    width,
  },
  backButton: {
    marginLeft: 40,
  },
  registerButton: {
    marginLeft: 'auto',
    marginRight: 40,
    height: 30,
  },
  registerButtonText: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 18,
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 36,
    marginLeft: 40,
    marginTop: 20,
  },
  description: {
    fontSize: 18,
    marginLeft: 40,
    marginTop: 10,
  },
  contentContainer: {
    height,
    width,
    marginTop: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  emailInput: {
    marginTop: 40,
    marginHorizontal: 40,
    fontSize: 18,
  },
  passwordInput: {
    marginTop: 15,
    marginHorizontal: 40,
    fontSize: 18,
  },
  forgotPassButton: {
    marginLeft: 'auto',
    marginRight: 40,
    marginTop: 10,
  },
  forgotButtonText: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 16,
  },
  signInButton: {
    marginLeft: 40,
    marginTop: 50,
    width: width - 80,
  },
  loginGoogleBtn: {
    backgroundColor: '#FFFFFF',
    marginLeft: 40,
    width: width - 80,
    marginTop: height - 680,
    marginBottom: 25,
  },
  loginGoogleText: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 16,
    color: Colors.text,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginLeft: 15,
  },
  loginRow: {
    width: 'auto',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loginGoogleLogo: {
    width: 20,
    height: 20,
    marginTop: 15,
  },
  loginFacebookBtn: {
    backgroundColor: '#1877F2',
    marginLeft: 40,
    marginBottom: height - 510,
    width: width - 80,
  },
  loginFacebookText: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginLeft: 15,
  },
  loginFacebookLogo: {
    width: 20,
    height: 20,
    marginTop: 15,
  },
});
