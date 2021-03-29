import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Mainpage from './Mainpage';

const Stack = createStackNavigator();

const MainStackNavigator = ({navigation}) => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Mainpage">
      <Stack.Screen name="Mainpage" component={Mainpage} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainStackNavigator;
