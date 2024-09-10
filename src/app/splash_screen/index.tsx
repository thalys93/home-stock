import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'

import React from 'react'
import { COLORS } from '~/constants/colors'
import { FONTS } from '~/constants/fonts';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

const Splash_Screen = () => {
  const photoSRC = require("~/assets/png/app_icon.png");

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', height: RFValue(350), marginTop: RFPercentage(14) }}>
        <Image source={photoSRC} height={RFValue(200)} width={RFValue(150)} style={{ objectFit: 'cover' }} />
        <Text style={{ color: COLORS.gray, fontSize: RFValue(25), height: RFValue(50), fontFamily: FONTS.Worksans, textTransform: 'uppercase', fontWeight: 'bold' }}> Home Stock </Text>
        <Text style={{ color: COLORS.gray, fontSize: RFValue(15), height: RFValue(30), fontFamily: FONTS.Worksans, textTransform: 'uppercase' }}> Alpha </Text>
      </View>

      <View style={{marginBottom: RFPercentage(10)}}>
        <ActivityIndicator color={COLORS.gray} size={RFValue(50)} />
      </View>
      
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
        <Text style={{ fontSize: RFValue(14), color: COLORS.gray, height: RFValue(100), width: RFValue(140), textAlign: 'center', fontFamily: FONTS.Worksans, textTransform: 'uppercase' }}> Carregando... </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.blue_night,    
  }
})

export default Splash_Screen