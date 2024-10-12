import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { home_navegation } from '~/utils/interfaces/global_interface'
import { routeProps } from '~/utils/interfaces/navigation_interface'
import { Icon } from 'react-native-paper'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from '~/constants/colors'
import { FONTS } from '~/constants/fonts'

const Home_Card = ({ name, icon, disabled, route }: home_navegation, { navigation }: routeProps) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={() => navigation?.navigate(route)}
            style={[styles.cardContainer, { backgroundColor: disabled ? "#232323" : "#2F2F2F" }]}>
            <Icon source={icon} size={RFValue(30)} color={disabled ? "#434343" : COLORS.whiteTxt} />
            <Text style={[styles.cardText, { color: disabled ? "#434343" : COLORS.whiteTxt }]}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: RFPercentage(3),
        alignItems: 'center',
        gap: RFPercentage(1),
        height: RFPercentage(18),
        width: RFPercentage(18), borderRadius: 19, justifyContent: 'center'
    },
    cardText: {
        fontSize: RFValue(12),
        fontFamily: FONTS.Worksans, 
        textTransform: 'uppercase'
    }
})
export default Home_Card