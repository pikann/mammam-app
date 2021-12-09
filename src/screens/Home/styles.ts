import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  background: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  center: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  video: {
    flex: 1,
  },
  tagView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: width * 0.2,
    width: width * 0.8,
  },
  tagTitle: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: '300',
    marginLeft: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  choicedTag: {
    fontWeight: 'bold',
    marginTop: -1,
  },
  searchButton: {
    marginLeft: 'auto',
    marginRight: 15,
    marginTop: -3,
  },
  absoluteView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: height - 55,
    width,
  },
  actionView: {
    backgroundColor: 'transparent',
    marginLeft: 'auto',
    marginTop: 'auto',
  },
  actionButton: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  likeActionButton: {
    marginTop: 'auto',
    width: 45,
    height: 45,
    marginLeft: 15,
    marginRight: 15,
  },
  actionCount: {
    color: Colors.background,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 3,
    marginBottom: 20,
  },
  avatarAuthor: {
    width: 50,
    height: 50,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 25,
  },
  description: {
    color: Colors.background,
    marginTop: 'auto',
    marginBottom: 15,
    marginLeft: 15,
  },
});
