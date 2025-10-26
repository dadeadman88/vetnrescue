import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import { Text } from 'react-native-ui-lib';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import LoginScreen from '../../components/molecules/LoginMol/LoginScreen';

const Login = () => {
  return (
    // <SafeAreaContainer safeArea={false}>
     <ScrollView showsVerticalScrollIndicator={false}>
      <LoginScreen />
      </ScrollView>
    // </SafeAreaContainer>
  );
};

export default Login;
