import {StyleSheet} from 'react-native';
import Colors from '../../../../constants/Colors';

export const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    paddingTop: 15,
    width: '100%',
  },
  avatarAuthor: {
    width: 35,
    height: 35,
    marginBottom: 20,
    marginRight: 15,
    borderRadius: 25,
  },
  content: {
    backgroundColor: Colors.gray,
    minHeight: 35,
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 25,
  },
  createAt: {
    fontSize: 10,
    marginTop: 4,
    marginLeft: 15,
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
    marginLeft: 7,
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
