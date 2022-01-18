import React from 'react';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import View, {Row} from '../../components/View';
import {styles} from './styles';
import {IconButton} from '../../components/Button';
import Colors from '../../constants/Colors';
import * as PostActions from '../Post/store/actions';
import {IVideoInfo} from '../Post/store/interface/video-info';
import Screens from '../../constants/Screens';

interface IProp {
  navigation: StackNavigationHelpers;
  pickVideo: (payload: IVideoInfo) => void;
}

const CameraScreen = (props: IProp) => {
  const onPickVideo = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
      includeBase64: true,
    });
    if (
      result?.assets &&
      result.assets[0].uri &&
      result.assets[0].type &&
      result.assets[0].duration
    ) {
      props.pickVideo({
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        duration: result.assets[0].duration,
      });
      props.navigation.navigate(Screens.Post);
    }
  };

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
          onPress={onPickVideo}
        />
      </Row>
      <IconButton
        style={styles.closeBtn}
        name={'close'}
        color={Colors.background}
        size={35}
        onPress={() => props.navigation.goBack()}
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  pickVideo: (payload: IVideoInfo) =>
    dispatch(PostActions.pickVideo.request(payload)),
});

export default connect(null, mapDispatchToProps)(CameraScreen);
