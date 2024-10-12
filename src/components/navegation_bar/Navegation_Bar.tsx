import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Return_FoundUser } from '~/utils/interfaces/api_response_interface'
import { ActivityIndicator, Avatar, IconButton } from 'react-native-paper'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
import { ThemeDark, ThemeLight } from '~/constants/global'
import { COLORS } from '~/constants/colors'

interface navegationProps {
    userProfileURL: string | null | undefined
    userName: string
}

const Navegation_Bar = ({ userProfileURL, userName }: navegationProps) => {
    const placeholder = 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg'

    if (!userProfileURL) {
        return <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ActivityIndicator animating={true} />
            <Text style={{ fontFamily: FONTS.Worksans }}> Carregando... </Text>
        </View>
    }


    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: RFPercentage(1) }}>
                <Avatar.Image
                    source={{ uri: userProfileURL ? userProfileURL : placeholder }}
                    size={RFValue(40)}
                />
                <View>
                    <Text style={{ fontFamily: FONTS.Worksans, fontSize: RFValue(12), color: COLORS.whitePrimary }}> Bem Vindo(a)! </Text>
                    <Text style={{ fontFamily: FONTS.Roboto, fontSize: RFValue(15), fontWeight: 'bold', color: COLORS.whitePrimary }}> {userName} </Text>
                </View>
            </View>

            <IconButton
                icon="bell-outline"
                iconColor='white'
                theme={ThemeDark}
                size={RFValue(30)}
            />
        </View>
    )
}

export default Navegation_Bar
