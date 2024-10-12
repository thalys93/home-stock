import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ModalTypes } from '~/utils/enums/modalTypes'
import SucessModal from './types/sucess'

interface NotificationContentProps {
    type: ModalTypes
    modalAction: () => void
}

const InformationModalContent = ({ type, modalAction }: NotificationContentProps) => {
    switch (type) {
        case ModalTypes.SUCCESS:
            return <SucessModal onPress={modalAction} />
        default:
            return null
    }
}

export default InformationModalContent