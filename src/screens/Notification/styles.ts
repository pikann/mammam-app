import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  flex: {flex: 1},
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 24,
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 40,
  },
  scrollContainer: {
    paddingHorizontal: 30,
  },
  notificationRow: {
    marginBottom: 20,
  },
  avatarAuthor: {
    width: 55,
    height: 55,
    marginRight: 20,
    borderRadius: 30,
  },
  content: {
    fontSize: 15,
    marginTop: 8,
  },
  contentBold: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 15,
    marginTop: 8,
  },
  createAt: {
    fontSize: 10,
    marginTop: 4,
  },
  loading: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
