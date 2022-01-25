import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Keyboard, KeyboardEvent} from 'react-native';
import {createStructuredSelector} from 'reselect';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import View from '../../components/View';
import {styles} from './styles';
import * as PostActions from './store/actions';
import {
  makeSelectDefaultDescription,
  makeSelectIsLoading,
  makeSelectUpdateId,
  makeSelectVideoDuration,
  makeSelectVideoType,
  makeSelectVideoURI,
} from './store/selectors';
import TextInput from '../../components/TextInput';
import Button, {IconButton} from '../../components/Button';
import Colors from '../../constants/Colors';
import Screens from '../../constants/Screens';

const {height} = Dimensions.get('window');

interface IProp {
  navigation: StackNavigationHelpers;
  videoURI: string;
  videoType: string;
  videoDuration: number;
  isLoading: boolean;
  updateId: string;
  defaultDescription: string;
  postVideo: (payload: any) => void;
  updatePost: (payload: any) => void;
}

const PostScreen = (props: IProp) => {
  const [description, setDescription] = useState(
    props.updateId === '' ? '' : props.defaultDescription,
  );

  const marginTop = useRef(new Animated.Value(height * 0.6)).current;

  const onSubmit = () => {
    if (props.updateId === '') {
      props.postVideo({
        description: description,
        video: props.videoURI,
        videoType: props.videoType,
        videoDuration: props.videoDuration,
        callback: () => {
          props.navigation.navigate(Screens.Home);
        },
      });
    } else {
      props.updatePost({
        _id: props.updateId,
        description,
        callback: () => {
          props.navigation.navigate(Screens.Home);
        },
      });
    }
  };

  useEffect(() => {
    Animated.timing(marginTop, {
      toValue: height * 0.6,
      duration: 400,
      useNativeDriver: false,
    }).start();

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        Animated.timing(marginTop, {
          toValue: height * 0.6 - e.endCoordinates.height,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(marginTop, {
        toValue: height * 0.6,
        duration: 400,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [marginTop]);

  return (
    <View style={styles.container}>
      <Video
        source={{
          uri: props.videoURI,
        }}
        style={styles.video}
        resizeMode={'contain'}
        repeat={true}
      />
      <Animated.View style={{...styles.infoContainer, marginTop}}>
        <TextInput
          style={styles.description}
          placeholder="Description..."
          defaultValue={props.updateId === '' ? '' : props.defaultDescription}
          onChangeText={text => setDescription(text)}
        />
        <TextInput
          style={styles.place}
          placeholder="Place..."
          editable={false}
        />
        <Button
          style={styles.postBtn}
          loading={props.isLoading}
          onPress={() => onSubmit()}>
          {props.updateId === '' ? 'Post' : 'Modify'}
        </Button>
      </Animated.View>
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

const mapStateToProps = createStructuredSelector<any, any>({
  videoURI: makeSelectVideoURI(),
  videoType: makeSelectVideoType(),
  videoDuration: makeSelectVideoDuration(),
  isLoading: makeSelectIsLoading(),
  updateId: makeSelectUpdateId(),
  defaultDescription: makeSelectDefaultDescription(),
});

const mapDispatchToProps = (dispatch: any) => ({
  postVideo: (payload: any) => dispatch(PostActions.postVideo.request(payload)),
  updatePost: (payload: any) =>
    dispatch(PostActions.updatePost.request(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
