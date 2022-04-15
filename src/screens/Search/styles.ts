import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  searchRow: {
    width,
    marginLeft: 20,
    marginTop: 20,
  },
  backButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  searchInput: {
    width: width - 90,
    height: 40,
    marginLeft: 15,
    paddingHorizontal: 20,
  },
  tagRow: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
  },
  tagTitle: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '300',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  choicedTag: {
    fontWeight: 'bold',
    marginTop: -1,
  },
  scrollContainer: {
    flex: 1,
    padding: 30,
    marginTop: 15,
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
