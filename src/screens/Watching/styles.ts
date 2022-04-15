import {StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  flex: {flex: 1},
  background: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  backButton: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 20,
  },
});
