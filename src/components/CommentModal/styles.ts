import {Dimensions, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  flex: {flex: 1},
  container: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalView: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 70,
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
    textAlign: 'center',
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
  replyingText: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  cancelReplying: {
    width: 15,
    height: 15,
    marginLeft: 'auto',
    marginRight: 10,
  },
});
