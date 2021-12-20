import {Dimensions, StyleSheet} from 'react-native';

import Colors from '../../../../constants/Colors';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    position: 'absolute',
    width,
    height: height - 70,
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
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    top: 50,
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 30,
    marginLeft: 50,
    marginTop: 35,
    marginBottom: 20,
  },
  scrollChild: {
    width,
    paddingHorizontal: 25,
  },
  loading: {
    width: 100,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  noCommentsView: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  noComments: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  noCommentsText: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.gray,
    marginTop: 15,
    marginBottom: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  commantEditView: {
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  commantEdit: {
    height: 40,
    width: width - 100,
  },
  commantButton: {
    height: 40,
    width: 40,
    marginLeft: 'auto',
    padding: 5,
  },
});
