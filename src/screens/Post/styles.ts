import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  cameraPreview: {
    width,
    height: height * 0.8,
  },
  bottomRow: {
    marginTop: 'auto',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  changeCameraBtn: {
    backgroundColor: Colors.primary,
    height: 35,
    width: 35,
    borderRadius: 10,
    marginTop: 25,
  },
  recordBtn: {
    backgroundColor: Colors.background,
    height: 70,
    width: 70,
    borderRadius: 35,
    marginLeft: 45,
    marginRight: 45,
  },
  pickInLibraryBtn: {
    backgroundColor: Colors.price,
    height: 35,
    width: 35,
    borderRadius: 10,
    marginTop: 25,
  },
});
