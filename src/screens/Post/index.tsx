import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Keyboard, KeyboardEvent} from 'react-native';
import {createStructuredSelector} from 'reselect';
import Video from 'react-native-video';
import {connect} from 'react-redux';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

import View from '../../components/View';
import {styles} from './styles';
import {makeSelectVideoURI} from './store/selectors';
import TextInput from '../../components/TextInput';
import Button, {IconButton} from '../../components/Button';
import Colors from '../../constants/Colors';

const {height} = Dimensions.get('window');

interface IProp {
  navigation: StackNavigationHelpers;
  videoURI: string;
}

const PostScreen = (props: IProp) => {
  const marginTop = useRef(new Animated.Value(height * 0.6)).current;

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
        <TextInput style={styles.description} placeholder="Description..." />
        <TextInput
          style={styles.place}
          placeholder="Place..."
          editable={false}
        />
        <Button style={styles.postBtn}>Post</Button>
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
});

export default connect(mapStateToProps, null)(PostScreen);
