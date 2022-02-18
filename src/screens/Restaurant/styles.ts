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
    height: height - 170,
    width,
    marginTop: 170,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  profileView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width,
    height: 110,
    marginTop: 80,
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
  topRow: {
    position: 'absolute',
    marginTop: 35,
    width,
  },
  backButton: {
    marginLeft: 40,
  },
  optionView: {
    backgroundColor: 'transparent',
    height: 27,
    width: 27,
    marginLeft: width - 120,
  },
  optionBtn: {
    height: 27,
  },
  scrollContainer: {
    padding: 30,
    marginTop: 15,
  },
  bioText: {
    fontFamily: 'SourceSansPro-Light',
    fontSize: 16,
    textAlign: 'center',
  },
  addressText: {
    fontFamily: 'SourceSansPro',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  followBtn: {
    width: width - 90,
    backgroundColor: Colors.price,
    shadowColor: 'transparent',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  listVideoView: {
    backgroundColor: 'transparent',
    marginTop: 30,
    marginBottom: 50,
  },
  thumbnailView: {
    backgroundColor: Colors.black,
    width: (width - 90) / 3,
    height: (width - 80) / 2,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 15,
  },
  thumbnailImage: {
    backgroundColor: Colors.black,
    width: (width - 90) / 3,
    height: (width - 80) / 2,
    borderRadius: 15,
  },
  viewBlurThumbnail: {
    position: 'absolute',
    backgroundColor: '#00000088',
    width: (width - 90) / 3,
    height: (width - 80) / 2,
    borderRadius: 15,
  },
  likeIconThumbnail: {
    marginTop: 'auto',
    marginLeft: 7,
    marginBottom: 7,
  },
  viewTotalThumbnail: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 15,
    color: Colors.background,
    marginTop: 'auto',
    marginLeft: 4,
    marginBottom: 6,
  },
  loading: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  menuItem: {
    color: Colors.text,
  },
});
