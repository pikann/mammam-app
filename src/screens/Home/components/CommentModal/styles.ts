import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    position: 'absolute',
    width,
    height,
    marginLeft: 0,
  },
  backgroundModal: {
    position: 'absolute',
    width,
    height,
  },
  modalView: {
    flex: 1,
    width,
    height,
    borderRadius: 50,
    top: 50,
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 30,
    marginLeft: 50,
    marginTop: 35,
    marginBottom: 20,
  },
});
