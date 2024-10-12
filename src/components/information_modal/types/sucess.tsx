import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
import { COLORS } from '~/constants/colors'
import { Button, Divider } from 'react-native-paper'
import { appName } from '~/constants/global'

interface btnProps {
    onPress: () => void
}

const SucessModal = (props: btnProps) => {
    return (
        <View>
            <View style={styles.headerBG}>
                <Text
                    style={styles.headerTXT}>
                    Cadastro Realizado com Sucesso !
                </Text>
                <Divider bold={true} style={styles.modalDivider} />
            </View>

            <View style={styles.TextContentContainer}>
                <Text style={styles.TextContentStyle}>
                    Bem-Vindo ao <Text style={styles.TextBoldContentStyle}>{appName}</Text>
                    <Text style={styles.TextContentStyle}>, O Seu app de gerenciamento de produtos Domésticos 🎊</Text>
                </Text>
            </View>

            <View style={styles.ImageContainer}>
                <Image source={require('~/assets/png/Success.png')}
                    style={styles.ImageStyle} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity    
                    onPress={props.onPress}                                    
                    style={styles.buttonStyle}>
                    <Text style={styles.ButtonTextStyle}>
                        Continuar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBG: {
        backgroundColor: "#00639C",
        borderTopLeftRadius: RFValue(15),
        borderTopRightRadius: RFValue(15),
        height: RFValue(70),
        justifyContent: 'center',
        alignItems: 'center'
    },    
	headerTXT: {
		fontFamily: FONTS.Worksans,
		fontWeight: 'bold',
		fontSize: RFValue(15),
		color: COLORS.whitePrimary,
		width: RFPercentage(26),
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	modalDivider: {
		borderColor: COLORS.whitePrimary,
		width: RFPercentage(25),
		marginTop: RFPercentage(1)
	},
	TextContentContainer: {
		margin: RFPercentage(4),
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	TextContentStyle: {
		fontFamily: FONTS.Worksans,
		fontSize: RFValue(13),
		textTransform: 'uppercase'
	},
	TextBoldContentStyle: {
		fontFamily: FONTS.Worksans,
		fontWeight: 'bold',
		fontSize: RFValue(13),
		textTransform: 'uppercase'
	},
	ImageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	ImageStyle: {
		objectFit: 'contain',
		height: RFValue(210),
		width: RFValue(210)
	},
	buttonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: RFPercentage(6)
	},
	buttonStyle: {
		width: RFPercentage(25),
		backgroundColor: "#2583B8",
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: RFValue(20),
		padding: RFValue(10)
	},
	ButtonTextStyle: {
		fontFamily: FONTS.Roboto,
		color: COLORS.whitePrimary,
		fontSize: RFValue(11),
		textTransform: 'uppercase',
		fontWeight: 'bold'
	}
});

export default SucessModal