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
    position: 'absolute',
    backgroundColor: Colors.background,
    width,
    height: height + 300,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  avatar: {
    width: 150,
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    borderRadius: 100,
  },
  changeAvatarBtn: {
    backgroundColor: Colors.primary,
    height: 40,
    width: 40,
    borderRadius: 30,
    marginLeft: width / 2 + 40,
    marginTop: -40,
  },
  usernameInput: {
    height: 50,
    marginTop: 35,
    marginHorizontal: 40,
    fontSize: 18,
  },
  bioInput: {
    height: height - 600,
    marginTop: 15,
    marginHorizontal: 40,
    fontSize: 18,
    borderRadius: 25,
  },
  submitButton: {
    marginLeft: 40,
    marginTop: 30,
    marginBottom: 30,
    width: width - 80,
  },
});
