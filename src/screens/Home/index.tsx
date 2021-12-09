import React, {useRef} from 'react';
import {Image} from 'react-native';
import Video from 'react-native-video';
import {IconButton, TextButton} from '../../components/Button';

import Text from '../../components/Text';
import View, {Row} from '../../components/View';
import Colors from '../../constants/Colors';
import {styles} from './styles';

const HomeScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.background}>
        <Video
          source={{
            uri: 'https://mammam-photo-video-bucket-dev.s3.ap-southeast-1.amazonaws.com/b18f1303-c759-4f45-b7a4-5b0dbd4fc9e1',
          }}
          style={styles.video}
          resizeMode={'contain'}
          repeat={true}
        />
        <Row style={styles.absoluteView}>
          <Text style={styles.description}>Description of user...</Text>
          <View style={styles.actionView}>
            <IconButton
              style={styles.likeActionButton}
              name={'heart'}
              color={Colors.background}
              size={45}
            />
            <Text style={styles.actionCount}>100</Text>
            <IconButton
              style={styles.actionButton}
              name={'ios-chatbubble-ellipses-sharp'}
              color={Colors.background}
              size={30}
            />
            <Text style={styles.actionCount}>100</Text>
            <IconButton
              style={styles.actionButton}
              name={'share-social'}
              color={Colors.background}
              size={30}
            />
            <Text style={styles.actionCount}>100</Text>
            <Image
              style={styles.avatarAuthor}
              source={{
                uri: 'https://mammam-photo-video-bucket-dev.s3.ap-southeast-1.amazonaws.com/ba3af8b3-d56f-417e-a801-1f10c2d047cb',
              }}
            />
          </View>
        </Row>
      </View>

      <Row style={styles.tagView}>
        <TextButton textStyle={{...styles.tagTitle, ...styles.choicedTag}}>
          For you
        </TextButton>
        <TextButton textStyle={{...styles.tagTitle}}>Popular</TextButton>
        <TextButton textStyle={{...styles.tagTitle}}>Following</TextButton>
        <IconButton
          style={styles.searchButton}
          name={'search'}
          color={Colors.background}
          size={15}
        />
      </Row>
    </View>
  );
};

export default HomeScreen;
