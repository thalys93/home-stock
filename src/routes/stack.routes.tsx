import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash_Screen from '~/app/splash_screen/Splash';
import UserRoutes from './user.routes';
import { routeProps } from '~/utils/interfaces/navigation_interface';

const stackRoutes = createNativeStackNavigator();

const AppRoutes = ({ navigation, route }: routeProps) => {
    return (
        <stackRoutes.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}>
            <stackRoutes.Screen name="SplashScreen" component={Splash_Screen} />
            <stackRoutes.Screen name="UserRoutes" component={UserRoutes} />
        </stackRoutes.Navigator>
    )
}

export default AppRoutes