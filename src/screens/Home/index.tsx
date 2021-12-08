import React from 'react';

import View from '../../components/View';
import Text from '../../components/Text';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        Home
      </Text>
    </View>
  );
};

export default HomeScreen;
