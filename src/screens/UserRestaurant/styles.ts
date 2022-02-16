import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
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
    height: height - 200,
    width,
    marginTop: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  scrollContainer: {
    marginTop: 40,
    paddingHorizontal: 30,
  },
  userRow: {
    marginLeft: 5,
    marginBottom: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 20,
    marginTop: 5,
    marginLeft: 25,
    marginRight: 20,
    textAlignVertical: 'center',
  },
  address: {
    fontSize: 13,
    marginTop: 5,
    marginLeft: 25,
    marginRight: 20,
    textAlignVertical: 'center',
  },
  followBtn: {
    width: 75,
    height: 30,
    backgroundColor: Colors.price,
    shadowColor: 'transparent',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  followBtnText: {
    fontSize: 14,
  },
  loading: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  optionView: {
    backgroundColor: 'transparent',
    height: 27,
    width: 27,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  optionBtn: {
    height: 27,
  },
  menuItem: {
    color: Colors.text,
  },
});
