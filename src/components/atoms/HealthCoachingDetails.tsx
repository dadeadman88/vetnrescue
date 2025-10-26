
import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { Typography } from '../atoms/Typography';
import { IMAGES, theme } from '../../constants';
import { onBack } from '../../navigation/RootNavigation';
import SafeAreaContainer from '../../containers/SafeAreaContainer';
import HeaderHome from './HomeAtoms/HeaderHome';
import { View } from 'react-native-ui-lib';
import { commonStyles } from '../../globalStyle';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

const HealthCoachingDetails = ({ title, subtitle, details }: any) => {
  

  return (
    <SafeAreaContainer safeArea={false}>
      <HeaderHome color={theme.color.primary} />
      <ScrollView style={{ flex: 1 }}>
        <View marginH-20 marginV-20>
          <TouchableOpacity onPress={() => onBack()}>
            <Image
              source={IMAGES.leftIconWithColor}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Typography
            align="center"
            textType="bold"
            size={theme.fontSize.large24}
            marginV-20
          >
            {title}
          </Typography>
          <Typography
            align="center"
            textType="semiBold"
            size={theme.fontSize.large}
            marginB-20
          >
            {subtitle}
          </Typography>

          {details.map((item: any, index: any) => (
            <View key={index} row marginV-20>
              <Image
                source={IMAGES.click}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <View marginH-20 flex>
                <Typography>
                  {item}
                </Typography>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

    </SafeAreaContainer>
  );
};

export default HealthCoachingDetails;
