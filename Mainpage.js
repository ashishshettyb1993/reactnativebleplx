import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Mainpage = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Mainpage;
