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
    paddingTop: 40,
  },
  passwordInput: {
    marginTop: 15,
    marginHorizontal: 40,
    fontSize: 18,
  },
  submitButton: {
    marginLeft: 40,
    marginTop: 50,
    width: width - 80,
  },
});
