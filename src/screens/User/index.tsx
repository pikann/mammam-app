import React, {useState} from 'react';
import {Image, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Menu, MenuItem} from 'react-native-material-menu';

import View, {Row} from '../../components/View';
import Text from '../../components/Text';
import {styles} from './styles';
import {makeSelectAvatar, makeSelectUsername} from '../../store/selectors';
import Colors from '../../constants/Colors';
import Button, {IconButton} from '../../components/Button';
import * as AppActions from '../../store/actions';

const UserScreen = (props: any) => {
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <View style={styles.background}>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Text style={styles.bioText}>Bio.........</Text>
          <Row style={styles.followProfile}>
            <View style={styles.followTextGroup}>
              <Text style={styles.followNumber}>10</Text>
              <Text style={styles.followField}>Followers</Text>
            </View>
            <View style={styles.followTextGroup}>
              <Text style={styles.followNumber}>10</Text>
              <Text style={styles.followField}>Followings</Text>
            </View>
          </Row>
          <Button style={styles.followBtn} loading={props.isLoading}>
            Update profile
          </Button>
        </ScrollView>
      </View>
      <Row style={styles.profileView}>
        <Image
          style={styles.avatar}
          source={{
            uri: props.avatar,
          }}
          defaultSource={require('../../assets/images/avatar-default.png')}
        />
        <Text style={styles.username}>{props.username}</Text>
      </Row>
      <View style={styles.optionView}>
        <IconButton
          style={styles.optionBtn}
          name={'ellipsis-vertical'}
          color={Colors.text}
          size={27}
          underlayColor={Colors.primary}
          onPress={() => setPopupVisible(!popupVisible)}
        />
        <Menu
          visible={popupVisible}
          onRequestClose={() => setPopupVisible(false)}>
          <MenuItem onPress={() => props.logout()}>Logout</MenuItem>
        </Menu>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector<any, any>({
  username: makeSelectUsername(),
  avatar: makeSelectAvatar(),
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(AppActions.logout.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
