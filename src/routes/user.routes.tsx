import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Home from '~/app/home/Home';
import Login from '~/app/login/Login';
import New_Categorie from '~/app/new_category/New_Category';
import Product from '~/app/product/Product';
import Product_List from '~/app/product_list/Product_List';
import Profile from '~/app/profile/Profile';
import Register from '~/app/register/Register';
import { COLORS } from '~/constants/colors';
import { routeProps } from '~/utils/interfaces/navigation_interface';
import BarRoutes from './bar.routes';

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
                    backgroundColor: COLORS.bgColor,
                },
                headerShadowVisible: false,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                        <View>
                            <Icon source={"chevron-left"} size={RFValue(30)} color={COLORS.whiteTxt} />
                        </View>
                    </TouchableOpacity>
                )
            }}
            component={Register} />

        <stackRoutes.Screen
            name="Auth_Routes"
            component={BarRoutes}
        />

        <stackRoutes.Screen
            name="product_list"
            component={Product_List}
        />

        <stackRoutes.Screen
            name="Product"
            component={Product} />

        <stackRoutes.Screen
            name="new_categorie"
            component={New_Categorie} />

        <stackRoutes.Screen
            name="Profile"
            component={Profile} />



    </stackRoutes.Navigator>
);

export default UserRoutes;