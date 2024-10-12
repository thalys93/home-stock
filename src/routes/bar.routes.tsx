import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routeProps } from '~/utils/interfaces/navigation_interface';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '~/constants/colors';
import { FONTS } from '~/constants/fonts';
import { Icon } from 'react-native-paper';
import Home from '~/app/home/Home';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';


const Tab = createBottomTabNavigator();

const BarRoutes = ({ navigation }: routeProps) => {
    const iconSize = RFValue(30);
    const bgColor = useSharedValue('#3C3C3C');
    
    const currentRoute = navigation?.getState().routes[navigation?.getState().index].name;
    const tabBarIconColor = useSharedValue('#3C3C3C');


    function getTabIconColor(focused: boolean) {
        
        if (focused) {
            tabBarIconColor.value = withTiming('#00639C', { duration: 1000 });
        }
        return tabBarIconColor.value;
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#2F2F2F",
                    borderTopColor: '#2F2F2F',
                    height: RFPercentage(12),
                },
                tabBarLabelStyle: {
                    fontFamily: FONTS.Worksans,
                    marginBottom: 10,
                    fontSize: RFValue(12),
                },
            }}

            initialRouteName='Home'
        >

            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[focused ? styles.barIconButton_Active : styles.barIconButton_Idle, { backgroundColor: `${bgColor}` }]}>
                            <Icon source="cash-multiple" color={COLORS.whitePrimary} size={iconSize} />
                        </View>
                    )

                }}

                name="Finances"
                component={Home} />

            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[focused ? styles.barIconButton_Active : styles.barIconButton_Idle, { backgroundColor: `${bgColor}` }]}>
                            <Icon source="warehouse" color={COLORS.whitePrimary} size={iconSize} />
                        </View>
                    )
                }}
                name="Warehouse"
                component={Home} />

            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[focused ? styles.barIconButton_Active : styles.barIconButton_Idle, { backgroundColor: `${bgColor}` }]}>
                            <Icon source="home" color={COLORS.whitePrimary} size={iconSize} />
                        </View>
                    )
                }}
                name="Home"
                component={Home}
            />

            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[focused ? styles.barIconButton_Active : styles.barIconButton_Idle, { backgroundColor: `${bgColor}` }]}>
                            <Icon source="progress-question" color={COLORS.whitePrimary} size={iconSize} />
                        </View>
                    )
                }}
                name="Faq"
                component={Home} />

            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={[focused ? styles.barIconButton_Active : styles.barIconButton_Idle, { backgroundColor: `${bgColor}` }]}>
                            <Icon source="account" color={COLORS.whitePrimary} size={iconSize} />
                        </View>
                    )
                }}
                name="Profile"
                component={Home} />

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    barIconButton_Idle: {
        marginTop: RFValue(5), // #3C3C3C cor desativada
        padding: RFPercentage(1),
        borderRadius: RFValue(10)
    },
    barIconButton_Active: {
        borderRadius: RFValue(10), // #00639C cor ativa 
        padding: RFPercentage(2),
    }
})

export default BarRoutes

