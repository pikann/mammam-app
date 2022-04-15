import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  background: {
    flex: 1,
    backgroundColor: Colors.black,
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
});
