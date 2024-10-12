import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '~/constants/colors'
import { FONTS } from '~/constants/fonts';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Splash_Screen = () => {
  const photoSRC = require("~/assets/png/app_icon.png");
  const opacity = useSharedValue(0);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const AnimatedOpacityStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value, }
  });

  const [loadingTXT, setLoadingTXT] = React.useState<string>('Carregando...')


  useEffect(() => {
    const handleFinishLoading = async () => {
      navigation.replace("UserRoutes")
    }
    const textChange = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoadingTXT('Quase lá ...');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoadingTXT('Pronto!');
      await new Promise((resolve) => setTimeout(resolve, 1000))
      handleFinishLoading();
    };

    opacity.value = withTiming(1, { duration: 5000 });

    textChange();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image source={photoSRC} style={[styles.image, AnimatedOpacityStyle]} />
        <Animated.Text style={[styles.title, AnimatedOpacityStyle]}>Home Stock</Animated.Text>
        <Animated.Text style={[styles.subtitle, AnimatedOpacityStyle]}>Alpha</Animated.Text>
      </View>

      <Animated.View style={[styles.loaderContainer, AnimatedOpacityStyle]}>
        <ActivityIndicator color={COLORS.whiteTxt} size={RFValue(50)} />
      </Animated.View>

      <View style={styles.textContainer}>
        <Animated.Text style={[styles.loadingText, AnimatedOpacityStyle]}>{loadingTXT}</Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: RFValue(350),
    marginTop: RFPercentage(14),
  },
  image: {
    height: RFValue(200),
    width: RFValue(200),
    resizeMode: 'contain',
  },
  title: {
    color: COLORS.whiteSecondary,
    fontSize: RFValue(25),
    height: RFValue(50),
    fontFamily: FONTS.Worksans,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.whiteSecondary,
    fontSize: RFValue(15),
    height: RFValue(30),
    fontFamily: FONTS.Worksans,
    textTransform: 'uppercase',
  },
  loaderContainer: {
    marginBottom: RFPercentage(10),
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: RFValue(14),
    color: COLORS.whiteSecondary,
    height: RFValue(100),
    width: RFValue(140),
    textAlign: 'center',
    fontFamily: FONTS.Worksans,
    textTransform: 'uppercase',
  },
})

export default Splash_Screen