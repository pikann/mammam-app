import * as React from 'react';
import {
  Image,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';
import {IPost} from '../../interfaces/post';
import Text from '../Text';
import View, {Row} from '../View';
import {styles} from './styles';

interface IProp {
  style: StyleProp<ViewStyle>;
  posts: IPost[];
  isLoading: boolean;
  onPressThumbnail: (index: number) => void;
}

export default function ListPost({
  style,
  posts,
  isLoading,
  onPressThumbnail,
}: IProp) {
  return (
    <View style={style}>
      {[...Array(Math.ceil(posts.length / 3)).keys()].map(rowId => (
        <Row key={rowId}>
          {[...Array(3).keys()].map(colId => {
            if (rowId * 3 + colId < posts.length) {
              return (
                <TouchableWithoutFeedback
                  key={colId}
                  onPress={() => onPressThumbnail(rowId * 3 + colId)}>
                  <View style={styles.thumbnailView}>
                    <Image
                      style={styles.thumbnailImage}
                      source={{uri: posts[rowId * 3 + colId].thumbnail}}
                    />
                    <Row style={styles.viewBlurThumbnail}>
                      <Icon
                        style={styles.likeIconThumbnail}
                        name="heart"
                        size={16}
                        color={Colors.background}
                      />
                      <Text style={styles.viewTotalThumbnail}>
                        {'' + posts[rowId * 3 + colId].likeTotal}
                      </Text>
                    </Row>
                  </View>
                </TouchableWithoutFeedback>
              );
            } else {
              return <View key={colId} />;
            }
          })}
        </Row>
      ))}
      {isLoading ? (
        <FastImage
          source={require('../../assets/images/white-loading.gif')}
          style={styles.loading}
        />
      ) : (
        <View />
      )}
    </View>
  );
}
