import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { routeProps } from '~/utils/interfaces/navigation_interface'
import { COLORS } from '~/constants/colors'
import { globalStyles, ThemeDark, ThemeLight } from '~/constants/global'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
import { Button, Checkbox, TextInput } from 'react-native-paper'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { doRegister, RegisterValues, NewUserPayload, } from '~/services/api/user'
import Toast from 'react-native-toast-message'
import { toastDarkMode } from '~/utils/configs/toast'
import { ModalTypes } from '~/utils/enums/modalTypes'
import { InformationModal } from '~/components/information_modal/InformationModal'
import InformationModalRoot from '~/components/information_modal/InformationModalRoot'
import { doLogin, loginProps } from '~/services/api/auth'
import { Req_Status } from '~/utils/enums/status'
import { Return_CreatedUser, Return_UserLogin } from '~/utils/interfaces/api_response_interface'
import { saveToken, saveUserId } from '../login/Login'

// todo: 
// * remodelar os toasts
// * adicionar lógica alinhada com switch, (cases, sucesso, erro, e dados incorretos)
// * testar interface sem lógica do backend (funcional)
const Register = ({ navigation, route }: routeProps) => {
    const [hidden, setHidden] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [checked, setChecked] = React.useState<boolean>(false);
    const [handleShowModal, setHandleShowModal] = React.useState<boolean>(false)
    const [success, setSuccess] = React.useState<boolean>(false)

    const formValues: RegisterValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        checkTerms: checked
    }

    const passwordRules = [
        "• Digite uma senha com pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um símbolo",
        "• Certifique-se de que sua senha seja única",
    ]

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('Nome não pode ser vazio'),
        lastName: Yup.string().required('Sobre nome não pode ser vazio'),
        email: Yup.string().email('Email Inválido').required('Email não pode ser vazio'),
        password: Yup.string()
            .required('Senha não pode ser vazia')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                'A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'),
        confirmPassword: Yup
            .string()
            .required('Confirmação de senha não pode ser vazia')
            .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
        checkTerms: Yup.boolean().required("Aceite os Termos de Uso")
    })

    function handleShowPassword() {
        setHidden(!hidden)
    }

    function termsValidation(values: RegisterValues) {
        values.checkTerms = checked
        if (checked === false) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Atenção",
                text1Style: {
                    textAlign: 'center',
                    fontFamily: FONTS.Worksans,
                    fontSize: RFValue(12),
                    color: COLORS.whitePrimary
                },
                text2: "Aceite os Termos de Uso",
                text2Style: {
                    textAlign: 'center',
                    fontFamily: FONTS.Worksans,
                    fontSize: RFValue(12),
                    color: COLORS.whitePrimary
                },
                autoHide: true,
                swipeable: true
            })
            return false
        }

        return true
    }

    async function handleSendForm(values: RegisterValues) {
        setIsLoading(true)
        console.log(values);


        const isValid = termsValidation(values)
        if (!isValid) {
            setIsLoading(false)
            return
        }

        const mappedValues: NewUserPayload = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            profile: {
                avatarUrl: `https://api.dicebear.com/9.x/avataaars-neutral/png?seed=${values.firstName}${values.lastName}`,
                bio: "",
                phoneNumber: "",
                dateOfBirth: new Date()
            }
        }

        await doRegister(mappedValues).then((res) => {
            switch (res.status) {
                case Req_Status.CREATED: {
                    setSuccess(true)
                    setTimeout(() => {
                        setHandleShowModal(true)
                    }, 2500)
                    break
                }
                case Req_Status.INTERNAL_ERROR: {
                    setSuccess(false)
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        autoHide: true,
                        swipeable: true,
                        text1: "Atenção",
                        text1Style: globalStyles.defaultToast1Text,
                        text2: res.data.message,
                        text2Style: globalStyles.defaultToast2Text,
                    })
                }
                case Req_Status.BAD_REQUEST: {
                    setSuccess(false)
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        autoHide: true,
                        swipeable: true,
                        text1: "Atenção",
                        text1Style: globalStyles.defaultToast1Text,
                        text2: res.data.message,
                        text2Style: globalStyles.defaultToast2Text,
                    })
                }
                default: {
                    break
                }
            }
        }).catch((e) => {
            setSuccess(false)
            Toast.show({
                type: 'error',
                position: 'top',
                autoHide: true,
                swipeable: true,
                text1: "Atenção",
                text1Style: globalStyles.defaultToast1Text,
                text2: e.message,
                text2Style: globalStyles.defaultToast2Text,
            })
        }).finally(() => {
            setIsLoading(false)
        })
    }

    async function handleCloseModalAndLogin(values: RegisterValues) {
        console.log(values);

        const loginData: loginProps = {
            email: values.email,
            password: values.password
        }

        await doLogin(loginData).then(async (res) => {
            switch (res.status) {
                case Req_Status.OK:
                    const sucessResponse: Return_UserLogin = res.data
                    Toast.show({
                        type: "success",
                        position: 'top',
                        autoHide: true,
                        swipeable: true,
                        text1: "Sucesso",
                        text1Style: globalStyles.defaultToast1Text,
                        text2: "Login Realizado com Sucesso",
                        text2Style: globalStyles.defaultToast2Text,
                    })
                    const tokenResponse = await saveToken(sucessResponse.token)
                    const userIdResponse = await saveUserId(sucessResponse.userData.id)

                    if (tokenResponse.message === "Token Salvo com Sucesso" && userIdResponse.message === "ID Salvo com Sucesso") {
                        navigation?.navigate("Auth_Routes")
                    }
                case Req_Status.UNAUTHORIZED:
                    return Toast.show({
                        type: 'error',
                        position: 'top',
                        autoHide: true,
                        swipeable: true,
                        text1: "Atenção",
                        text1Style: globalStyles.defaultToast1Text,
                        text2: res.data.message,
                        text2Style: globalStyles.defaultToast2Text,
                    });
                default:
                    return Toast.show({
                        type: 'info',
                        position: 'top',
                        autoHide: true,
                        swipeable: true,
                        text1: "Atenção",
                        text1Style: globalStyles.defaultToast1Text,
                        text2: "Sem Informação",
                        text2Style: globalStyles.defaultToast2Text,
                    })
            }
        }).catch((e) => {
            setHandleShowModal(false)
            Toast.show({
                type: "error",
                position: 'top',
                autoHide: true,
                swipeable: true,
                text1: "Atenção",
                text1Style: globalStyles.defaultToast1Text,
                text2: "Ocorreu um Erro ao Logar",
                text2Style: globalStyles.defaultToast2Text,
            })
            console.error("Erro ao Logar:", e)
            navigation?.navigate('Login')
        }).finally(() => {
            setHandleShowModal(false)
            setIsLoading(false);
        })
    }


    return (
        <>
            <View style={{ zIndex: 99, position: 'relative', top: RFValue(-35)}}>
                <Toast config={toastDarkMode} />
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: COLORS.bgColor, paddingTop: 0 }}>
                <View style={{ justifyContent: 'space-between', paddingTop: RFPercentage(0) }}>
                    <View style={{ gap: RFPercentage(3) }}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: RFPercentage(1) }}>
                            <Text style={{ fontSize: RFValue(20), fontFamily: FONTS.Worksans, color: COLORS.whitePrimary }}> Nova Conta </Text>
                            <Text style={{ fontSize: RFValue(16), fontFamily: FONTS.Roboto, color: COLORS.whiteSecondary }}> Cadastro </Text>
                        </View>
                        <KeyboardAvoidingView>
                            <Formik initialValues={formValues} validationSchema={RegisterSchema} onSubmit={handleSendForm}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                    <>
                                        {handleShowModal && (
                                            <InformationModal.Root>
                                                <InformationModal.Content type={ModalTypes.SUCCESS} modalAction={() => handleCloseModalAndLogin(values)}>
                                                </InformationModal.Content>
                                            </InformationModal.Root>
                                        )}
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', gap: RFPercentage(2) }}>
                                                <TextInput
                                                    label={"Nome *"}
                                                    value={values.firstName}
                                                    onChangeText={handleChange('firstName')}
                                                    onBlur={handleBlur('firstName')}
                                                    mode='outlined'
                                                    style={{ width: RFPercentage(40) }}
                                                    left={<TextInput.Icon color={COLORS.whitePrimary} icon="view-headline" />}
                                                    theme={ThemeDark}
                                                />
                                                {errors.firstName && (
                                                    <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.orangePrimary, fontSize: RFValue(10) }}> {errors.firstName} </Text>
                                                )}

                                                <TextInput
                                                    label={"Sobre Nome * "}
                                                    mode='outlined'
                                                    value={values.lastName}
                                                    onChangeText={handleChange('lastName')}
                                                    onBlur={handleBlur('lastName')}
                                                    style={{ width: RFPercentage(40) }}
                                                    left={<TextInput.Icon icon="view-headline" color={COLORS.whitePrimary} />}
                                                    theme={ThemeDark}
                                                />

                                                {errors.lastName && (
                                                    <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.orangePrimary, fontSize: RFValue(10) }}> {errors.lastName} </Text>
                                                )}

                                                <TextInput
                                                    label={"Email *"}
                                                    mode='outlined'
                                                    value={values.email}
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    style={{ width: RFPercentage(40) }}
                                                    left={<TextInput.Icon color={COLORS.whitePrimary} icon="email" />}
                                                    theme={ThemeDark}
                                                />

                                                {errors.email && (
                                                    <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.orangePrimary, fontSize: RFValue(10) }}> {errors.email} </Text>
                                                )}

                                                <TextInput
                                                    label={"Senha *"}
                                                    mode='outlined'
                                                    value={values.password}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('email')}
                                                    style={{ width: RFPercentage(40) }}
                                                    left={<TextInput.Icon icon="lock" color={COLORS.whitePrimary} />}
                                                    right={<TextInput.Icon color={COLORS.whitePrimary} icon={hidden ? "eye" : "eye-off"} onPress={handleShowPassword} />}
                                                    secureTextEntry={hidden ? false : true}
                                                    theme={ThemeDark}
                                                />

                                                {errors.password && (
                                                    <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.orangePrimary, fontSize: RFValue(10), width: RFPercentage(40) }}> {errors.password} </Text>
                                                )}

                                                <TextInput
                                                    label={"Confirme a Senha *"}
                                                    mode='outlined'
                                                    value={values.confirmPassword}
                                                    onChangeText={handleChange('confirmPassword')}
                                                    onBlur={handleBlur('confirmPassword')}
                                                    style={{ width: RFPercentage(40) }}
                                                    left={<TextInput.Icon icon="lock" color={COLORS.whitePrimary} />}
                                                    right={<TextInput.Icon color={COLORS.whitePrimary} icon={hidden ? "eye" : "eye-off"} onPress={handleShowPassword} />}
                                                    secureTextEntry={hidden ? false : true}
                                                    theme={ThemeDark}
                                                />

                                                {errors.confirmPassword && (
                                                    <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.orangePrimary, fontSize: RFValue(10) }}> {errors.confirmPassword} </Text>
                                                )}

                                                <View style={{ flexDirection: 'row', gap: RFPercentage(1), alignItems: 'center', }}>
                                                    <View style={{ flexDirection: 'row', gap: 2 }}>
                                                        <TouchableOpacity>
                                                            <Text style={styles.EmpashisText}>Termos de Uso</Text>
                                                        </TouchableOpacity>
                                                        <Text style={{ fontSize: RFValue(13), fontFamily: FONTS.Roboto, color: COLORS.whiteTxt }}> e </Text>
                                                        <TouchableOpacity>
                                                            <Text style={styles.EmpashisText}>Privacidade</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <Checkbox
                                                        onPress={() => { setChecked(!checked) }}
                                                        status={checked ? 'checked' : 'unchecked'}
                                                        theme={ThemeDark}
                                                    />
                                                </View>
                                                {errors.checkTerms && (
                                                    <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.orangePrimary, fontSize: RFValue(10) }}> {errors.checkTerms} </Text>
                                                )}
                                            </View>


                                            <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFPercentage(2), marginTop: RFPercentage(5), marginVertical: RFPercentage(3) }}>
                                                <Button onPress={() => handleSubmit()} theme={ThemeLight} mode='contained' style={{ width: RFPercentage(40), backgroundColor: success ? COLORS.greenPrimary : COLORS.bluePrimary }}>
                                                    {isLoading ? (
                                                        <ActivityIndicator color={COLORS.whitePrimary} />
                                                    ) : (
                                                        <Text style={styles.buttonTxt}> {success ? "Concluído" : "Cadastrar"} </Text>
                                                    )}
                                                </Button>
                                            </View>
                                        </View>
                                    </>
                                )}
                            </Formik>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    EmpashisText: {
        fontSize: RFValue(13),
        fontFamily: FONTS.Roboto,
        color: COLORS.bluePrimary,
        textDecorationLine: 'underline'
    },
    buttonTxt: {
        fontFamily: FONTS.Worksans,
        color: COLORS.whitePrimary,
        textTransform: 'uppercase',
        fontSize: RFValue(15)
    }
});

export default Register
