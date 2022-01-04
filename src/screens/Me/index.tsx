import React from 'react';

import View from '../../components/View';
import Text from '../../components/Text';

const MeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        Me
      </Text>
    </View>
  );
};

export default MeScreen;
