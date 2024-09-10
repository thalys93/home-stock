import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '~/app/login';

const stackRoutes = createStackNavigator();
const UserRoutes = () => (
    <stackRoutes.Navigator
        initialRouteName="GetStarted"
        screenOptions={{
            headerShown: false,
            gestureEnabled: false,
        }}>
        <stackRoutes.Screen name="Login" component={Login} />
    </stackRoutes.Navigator>
);

export default UserRoutes;