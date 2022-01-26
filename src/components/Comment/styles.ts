import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

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
    flex: 1,
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
    marginTop: 4,
    marginLeft: 20,
  },
  replyText: {
    fontSize: 10,
  },
  showRepliesText: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 5,
  },
  loading: {
    width: 80,
    height: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -20,
    marginBottom: -25,
  },
  actionView: {
    backgroundColor: 'transparent',
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  menuItem: {
    color: Colors.text,
  },
});
