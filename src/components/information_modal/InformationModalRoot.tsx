import { View, Text, Modal, StyleSheet, ImageBackgroundComponent } from 'react-native'
import React, { ReactNode } from 'react'
import { BlurView } from 'expo-blur';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface informationModalRootProps {
    children: ReactNode
}

const InformationModalRoot = ({ children }: informationModalRootProps) => {
    return (
        <Modal animationType='slide' transparent={true}>
            <BlurView intensity={100} tint='dark' style={styles.modalBackground} >
                <View style={styles.modalContainerBG}>
                    {children}
                </View>
            </BlurView>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainerBG: {
        backgroundColor: "#D9D9D9",
        width: RFPercentage(40),
        height: RFPercentage(75),
        borderRadius: RFValue(15),
    }
})

export default InformationModalRoot