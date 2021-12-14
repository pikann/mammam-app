import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../../constants/Colors';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  avatarAuthor: {
    width: 35,
    height: 35,
    marginBottom: 20,
    borderRadius: 25,
  },
  content: {
    backgroundColor: Colors.gray,
    width: width - 100,
    minHeight: 35,
    paddingVertical: 10,
    paddingHorizontal: 17,
    marginLeft: 15,
    borderRadius: 25,
  },
  createAt: {
    fontSize: 10,
    marginTop: 4,
    marginLeft: 30,
  },
  likeActionButton: {
    width: 35,
    height: 22,
    paddingLeft: 18,
  },
  likeTotal: {
    fontSize: 10,
    marginTop: 4,
  },
  repliesRow: {
    marginLeft: 20,
  },
  reply: {
    fontSize: 10,
    marginTop: 4,
    marginLeft: 20,
  },
  showRepliesText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },
});
