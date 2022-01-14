import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  background: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  contentContainer: {
    height,
    width,
    marginTop: 140,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  profileView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width,
    height: 110,
    marginTop: 50,
  },
  avatar: {
    width: 110,
    height: 110,
    marginLeft: 35,
    borderRadius: 55,
  },
  username: {
    fontFamily: 'SourceSansPro-SemiBold',
    flex: 1,
    fontSize: 30,
    marginLeft: 20,
    marginRight: 20,
    textAlignVertical: 'center',
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
  scrollContainer: {
    padding: 40,
  },
  bioText: {
    fontFamily: 'SourceSansPro-Light',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  followProfile: {
    marginTop: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  followTextGroup: {
    marginRight: 20,
    marginLeft: 20,
  },
  followNumber: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  followField: {
    fontFamily: 'SourceSansPro-Light',
    fontSize: 15,
  },
  followBtn: {
    width: width - 80,
    backgroundColor: Colors.price,
    shadowColor: 'transparent',
    marginTop: 30,
  },
});
