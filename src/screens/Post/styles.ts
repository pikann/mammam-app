import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  video: {
    width,
    height: height * 0.6,
  },
  infoContainer: {
    position: 'absolute',
    width,
    height,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  description: {
    height: 100,
    marginTop: 35,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 25,
    textAlignVertical: 'top',
    padding: 15,
    paddingHorizontal: 20,
  },
  place: {
    height: 45,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  postBtn: {
    width: width - 70,
    backgroundColor: Colors.primary,
    shadowColor: 'transparent',
    elevation: 3,
    marginTop: 'auto',
    marginBottom: height * 0.6 + 20,
    marginLeft: 35,
    marginRight: 35,
  },
  closeBtn: {
    position: 'absolute',
    width: 35,
    height: 35,
    marginTop: 18,
    marginLeft: 18,
  },
});
