import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Splash_Screen from '~/app/splash_screen';
import UserRoutes from './user.routes';

const stackRoutes = createStackNavigator();

const appRoutes = () => {
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

export default appRoutes