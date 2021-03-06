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
  videoFrame: {
    backgroundColor: Colors.black,
    width: width,
    height: Math.floor(height - 55),
  },
  loading: {
    width: 100,
    height: 100,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  video: {
    position: 'absolute',
    top: 0,
    width: width,
    height: Math.floor(height - 56),
  },
  absoluteView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: Math.floor(height - 55),
    width,
  },
  actionView: {
    backgroundColor: 'transparent',
    marginLeft: 'auto',
    marginTop: 'auto',
  },
  actionButton: {
    backgroundColor: 'transparent',
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
    marginTop: 25,
    marginBottom: 20,
    borderRadius: 25,
  },
  descriptionView: {
    backgroundColor: 'transparent',
    marginTop: 'auto',
    marginBottom: 15,
    marginLeft: 15,
  },
  restaurant: {
    color: Colors.background,
    fontSize: 12,
    marginBottom: 5,
  },
  description: {
    color: Colors.background,
    fontSize: 15,
    marginBottom: 10,
    marginTop: 5,
  },
  views: {
    color: Colors.background,
    fontSize: 12,
  },
  noPostView: {
    backgroundColor: Colors.black,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  noPostText: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 10,
  },
  videoFrameFull: {
    backgroundColor: Colors.black,
    width: width,
    height: Math.floor(height),
  },
  videoFull: {
    position: 'absolute',
    top: 0,
    width: width,
    height: Math.floor(height - 1),
  },
  absoluteViewFull: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: Math.floor(height),
    width,
  },
  optionBtn: {
    height: 27,
  },
  menuItem: {
    color: Colors.text,
  },
});
