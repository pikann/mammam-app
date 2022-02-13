import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  searchInput: {
    position: 'absolute',
    backgroundColor: Colors.background,
    width: width - 80,
    height: 40,
    marginLeft: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: 27,
    width: 27,
    marginLeft: width - 45,
    marginTop: 25,
  },
  optionBtn: {
    height: 27,
  },
  menuItem: {
    color: Colors.text,
  },
  contentContainer: {
    backgroundColor: Colors.background,
    position: 'absolute',
    width,
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
    flex: 1,
    fontSize: 20,
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
});
