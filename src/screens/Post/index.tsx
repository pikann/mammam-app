import React from 'react';
import {RNCamera} from 'react-native-camera';

import View, {Row} from '../../components/View';
import {styles} from './styles';
import {IconButton} from '../../components/Button';
import Colors from '../../constants/Colors';
import {TouchableOpacity} from 'react-native';

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.cameraPreview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <Row style={styles.bottomRow}>
        <IconButton
          style={styles.changeCameraBtn}
          name={'camera-reverse-outline'}
          color={Colors.background}
          size={27}
          underlayColor={Colors.primary}
        />
        <TouchableOpacity style={styles.recordBtn} />
        <IconButton
          style={styles.pickInLibraryBtn}
          name={'folder'}
          color={Colors.background}
          size={23}
          underlayColor={Colors.price}
        />
      </Row>
    </View>
  );
};

export default PostScreen;
