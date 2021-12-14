import * as React from 'react';
import Modal from 'react-native-modal';

import Text from '../../../../components/Text';
import View from '../../../../components/View';
import Comment from '../Comment';
import {styles} from './styles';

export default function CommentModal(props: any) {
  return (
    <Modal
      style={styles.container}
      backdropColor="#00000055"
      isVisible={props.commandModelShow}
      animationInTiming={500}
      animationOutTiming={500}
      statusBarTranslucent
      onBackdropPress={() => props.setCommandModelShow(false)}
      swipeDirection="down"
      swipeThreshold={50}
      onSwipeComplete={() => props.setCommandModelShow(false)}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Comment</Text>
        <Comment />
      </View>
    </Modal>
  );
}
