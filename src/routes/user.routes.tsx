import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Login from '~/app/login';
import Register from '~/app/register';
import { COLORS } from '~/constants/colors';
import { routeProps } from '~/utils/interfaces/navigation_interfaces';

const stackRoutes = createNativeStackNavigator();

const UserRoutes = ({ navigation, route }: routeProps) => (
    <stackRoutes.Navigator
        initialRouteName='Login'
        screenOptions={{
            headerShown: false,
            gestureEnabled: false,
        }}>
        <stackRoutes.Screen
            name='Login'
            component={Login} />

        <stackRoutes.Screen
            name='Register'
            options={{
                headerShown: true,
                headerBackButtonMenuEnabled: true,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: COLORS.dark_blue.background,
                },
                headerShadowVisible: false,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                        <View>
                            <Icon source={"chevron-left"} size={RFValue(30)} color={COLORS.light_blue.onPrimary} />
                        </View>
                    </TouchableOpacity>
                )
            }}
            component={Register} />

    </stackRoutes.Navigator>
);

export default UserRoutes;