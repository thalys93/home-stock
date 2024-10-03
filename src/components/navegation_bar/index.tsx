import { View, Text } from 'react-native'
import React from 'react'
import { FoundUser } from '~/utils/interfaces/api_response_interface'
import { ActivityIndicator, Avatar, IconButton } from 'react-native-paper'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
import { ThemeDark, ThemeLight } from '~/constants/global'

interface navegationProps {
    userData: FoundUser | null
}

const Navegation_Bar = ({userData}: navegationProps) => {
    const placeholder = 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg'

    if(!userData) {
        return <ActivityIndicator size={20}/>;
    } 
    
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <IconButton icon="menu" mode='contained' theme={ThemeLight}/>
            <Text style={{fontFamily: FONTS.Worksans}}> Home Stock </Text>
            <Avatar.Image source={{ uri: userData.avatar || placeholder }} size={RFValue(50)}/>
        </View>
    )
}

export default Navegation_Bar