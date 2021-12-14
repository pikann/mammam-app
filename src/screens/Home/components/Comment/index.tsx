import * as React from 'react';
import {Image} from 'react-native';
import {IconButton} from '../../../../components/Button';

import Text from '../../../../components/Text';
import View, {Row} from '../../../../components/View';
import Colors from '../../../../constants/Colors';
import {styles} from './styles';

export default function Comment() {
  return (
    <Row style={styles.container}>
      <Image
        style={styles.avatarAuthor}
        source={{
          uri: 'https://mammam-photo-video-bucket-dev.s3.ap-southeast-1.amazonaws.com/ba3af8b3-d56f-417e-a801-1f10c2d047cb',
        }}
      />
      <View>
        <Text style={styles.content}>Comment...</Text>
        <Row>
          <Text style={styles.createAt}>3 hours ago</Text>
          <IconButton
            style={styles.likeActionButton}
            name={'heart'}
            color={Colors.secondary}
            size={15}
          />
          <Text style={styles.likeTotal}>1k</Text>
          <Text style={styles.reply}>Reply</Text>
        </Row>
        <Row style={styles.repliesRow}>
          <IconButton
            name={'chevron-down-outline'}
            color={Colors.text}
            size={17}
          />
          <Text style={styles.showRepliesText}>Read 200 replies</Text>
        </Row>
      </View>
    </Row>
  );
}
