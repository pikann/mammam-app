import React, {useRef} from 'react';
import {Animated, Image} from 'react-native';

import Button, {BackButton, IconButton} from '../../components/Button';
import Text from '../../components/Text';
import TextInput from '../../components/TextInput';
import View, {Row} from '../../components/View';
import Colors from '../../constants/Colors';
import {styles} from './styles';

export default function UpdateProfileScreen({navigation}: any) {
  const marginTop = useRef(new Animated.Value(50)).current;

  const onFocusUsername = () => {
    Animated.timing(marginTop, {
      toValue: -80,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {});
  };
  const onBlurUsername = () => {
    Animated.timing(marginTop, {
      toValue: 50,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {});
  };
  return (
    <View style={styles.background}>
      <Row style={styles.topRow}>
        <BackButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
      </Row>
      <Text style={styles.title}>Update profile</Text>
      <Text style={styles.description}>Update your display profile</Text>
      <Animated.View style={{...styles.contentContainer, marginTop}}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/default-avatar.png')}
          height={200}
          width={200}
        />
        <IconButton
          style={styles.changeAvatarBtn}
          name={'camera-reverse-outline'}
          color={Colors.background}
          size={32}
        />
        <TextInput
          style={styles.usernameInput}
          placeholder="Username"
          onFocus={onFocusUsername}
          onBlur={onBlurUsername}
        />
        <Button
          style={styles.submitButton}
          onPress={() => console.log('Submit')}>
          Submit
        </Button>
      </Animated.View>
    </View>
  );
}
