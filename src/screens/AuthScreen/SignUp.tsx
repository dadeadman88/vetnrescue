import React from 'react';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import SignUpFields from '../../components/molecules/SignUpMol/SignUpFields';
import { ScrollView } from 'react-native';

const SignUp = () => {
  return (
    <SafeAreaContainer safeArea={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <SignUpFields />
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default SignUp;
