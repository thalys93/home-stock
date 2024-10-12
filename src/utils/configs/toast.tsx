import { RFValue } from 'react-native-responsive-fontsize';
import Toast, { BaseToast, ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message';
import { COLORS } from '~/constants/colors';
import { FONTS } from '~/constants/fonts';

export const toastDarkMode = {
    success: (props: any) => (
        <SuccessToast
            {...props}
            text1Style={{
                color: '#54d134',
                textAlign: 'center',
                fontFamily: FONTS.Worksans,
                fontSize: RFValue(12),
            }}
            contentContainerStyle={{ backgroundColor: COLORS.cardBg }}
            
        />
    ),

    info: (props: any) => (
        <InfoToast
            {...props}
            contentContainerStyle={{ backgroundColor: COLORS.cardBg }}
        />
    ),

    error: (props: any) => (
        <ErrorToast
            {...props}
            text1Style={{
                color: COLORS.orangePrimary, textAlign: 'center',
                fontFamily: FONTS.Worksans,
                fontSize: RFValue(12),
            }}
            contentContainerStyle={{ backgroundColor: COLORS.cardBg }}
            style={{ borderColor: COLORS.orangePrimary}}
        />
    )
}