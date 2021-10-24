import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.text,
    borderRadius: 10000,
    height: 50,
    width: 150,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
  },
  textStyleButton: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    flex: 1,
    textAlignVertical: 'center',
  },
  flex: {
    flex: 1,
  },
  backButton: {
    height: 25,
    width: 25,
  },
  textButton: {
    height: 20,
  },
});
