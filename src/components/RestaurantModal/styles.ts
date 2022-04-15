import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 70,
  },
  place: {
    height: 45,
    marginTop: 35,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 25,
    paddingHorizontal: 20,
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
});
