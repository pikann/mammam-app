import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window');

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
  logoutButton: {
    marginLeft: 'auto',
    marginRight: 40,
    height: 30,
  },
  logoutButtonText: {
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
    backgroundColor: Colors.background,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  avatar: {
    width: 200,
    height: 200,
    marginLeft: width / 2 - 100,
    marginTop: 50,
    borderRadius: 100,
  },
  changeAvatarBtn: {
    backgroundColor: Colors.primary,
    height: 55,
    width: 55,
    borderRadius: 30,
    marginLeft: width / 2 + 40,
    marginTop: -50,
  },
  usernameInput: {
    marginTop: 60,
    marginHorizontal: 40,
    fontSize: 18,
  },
  submitButton: {
    marginLeft: 40,
    marginTop: 50,
    width: width - 80,
  },
});
