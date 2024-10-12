import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import 'react-native-gesture-handler';
import './global.css';


import { COLORS } from '~/constants/colors';
import Routes from '~/routes/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    WorkSans: require('~/assets/fonts/WorkSans.ttf'),
    Roboto: require('~/assets/fonts/Roboto.ttf'),
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>      
      <StatusBar translucent={true} barStyle="light-content" backgroundColor={COLORS.bgColor} />
      <Routes />
    </GestureHandlerRootView>
  );
}
