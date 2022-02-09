import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  addButton: {
    backgroundColor: Colors.primary,
    width: 75,
    height: 37,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 13,
  },
  addIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  notificationText: {
    position: 'absolute',
    backgroundColor: Colors.price,
    height: 15,
    width: 15,
    borderRadius: 8,
    marginLeft: 15,
    marginTop: -3,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 10,
    color: Colors.background,
  },
});
