import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  topRow: {
    marginTop: 35,
    width,
  },
  backButton: {
    marginLeft: 40,
  },
  addressInput: {
    height: 50,
    marginTop: 25,
    marginBottom: 40,
    marginHorizontal: 40,
    fontSize: 18,
  },
  submitButton: {
    marginLeft: 40,
    marginTop: 40,
    marginBottom: 30,
    width: width - 80,
  },
  mapView: {
    flex: 1,
    justifyContent: 'center',
  },
  markerView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 35,
    height: 35,
    paddingBottom: 70,
    alignSelf: 'center',
  },
  marker: {
    width: 35,
    height: 35,
  },
});
