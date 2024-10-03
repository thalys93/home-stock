import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { routeProps } from '~/utils/interfaces/navigation_interfaces'
import { COLORS } from '~/constants/colors'
import { globalStyles, ThemeDark, ThemeLight } from '~/constants/global'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
import { Button, Checkbox, TextInput } from 'react-native-paper'
import { apiRegisterValues, RegisterValues } from '~/utils/interfaces/register_interfaces'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { doRegister } from '~/services/api/user'
import Toast from 'react-native-toast-message'
import { toastDarkMode } from '~/utils/configs/toast'

const Register = ({ navigation, route }: routeProps) => {
    const [hidden, setHidden] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [checked, setChecked] = React.useState<boolean>(false);

    const formValues: RegisterValues = {
        name: '',
        lastname: '',
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
        name: Yup.string().required('Nome não pode ser vazio'),
        lastname: Yup.string().required('Sobre nome não pode ser vazio'),
        email: Yup.string().email('Email Inválido').required('Email não pode ser vazio'),
        password: Yup.string()
            .required('Senha não pode ser vazia')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                'A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'),
        confirmPassword: Yup
            .string()
            .required('Confirmação de senha não pode ser vazia')
            .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
        checkTerms: Yup.boolean()
    })

    function handleShowPassword() {
        setHidden(!hidden)
    }

    function termsValidation(values: RegisterValues) {
        if (checked === false) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Atenção",
                text1Style: {
                    textAlign: 'center',
                    fontFamily: FONTS.Worksans,
                    fontSize: RFValue(12),
                    color: COLORS.light_blue.surface
                },
                text2: "Aceite os Termos de Uso",
                text2Style: {
                    textAlign: 'center',
                    fontFamily: FONTS.Worksans,
                    fontSize: RFValue(12),
                    color: COLORS.light_blue.onPrimary
                },
                autoHide: true,
                swipeable: true
            })
            return false
        }

        return true
    }

    // todo: terminar de adicionar os toasts e configurar para async/await função funcionando retornando dados

    async function handleSendForm(values: RegisterValues) {
        setIsLoading(true)

        const isValid = termsValidation(values)
        if (!isValid) {
            setIsLoading(false)
            return
        }

        Toast.show({
            type: 'info',
            position: 'top',
            text1: "Atenção",
            text1Style: {
                textAlign: 'center',
                fontFamily: FONTS.Worksans,
                fontSize: RFValue(12),
                color: COLORS.light_blue.surface
            },
            text2: "Realizando Cadastro",
            text2Style: {
                textAlign: 'center',
                fontFamily: FONTS.Worksans,
                fontSize: RFValue(12),
                color: COLORS.light_blue.onPrimary
            },
            autoHide: true,
            swipeable: true
        })

        const mappedValues: apiRegisterValues = {
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
        }


        const isDoneRegister = await doRegister(mappedValues).then((res) => {
            switch (res.message) {
                case "Cadastro Realizado com Sucesso":
                    return (Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: "Sucesso",
                        text1Style: {
                            textAlign: 'center',
                            fontFamily: FONTS.Worksans,
                            fontSize: RFValue(12),
                            color: COLORS.light_blue.surface
                        },
                        text2: "Cadastro Realizado",
                        text2Style: {
                            textAlign: 'center',
                            fontFamily: FONTS.Worksans,
                            fontSize: RFValue(12),
                            color: COLORS.light_blue.onPrimary
                        },
                        autoHide: true,
                        swipeable: true
                    }))
                case "Falha ao Cadastrar":
                    return res.data
                case "Erro Interno":
                    return res.data
                default:
                    return res.data
            }
        })

        if (!isDoneRegister) {
            return Toast.show({
                type: 'error',
                position: 'top',
                text1: "Atenção",
                text1Style: {
                    textAlign: 'center',
                    fontFamily: FONTS.Worksans,
                    fontSize: RFValue(12),
                    color: COLORS.light_blue.surface
                },
                text2: "Ocorreu um Erro ao Cadastrar",
                text2Style: {
                    textAlign: 'center',
                    fontFamily: FONTS.Worksans,
                    fontSize: RFValue(12),
                    color: COLORS.light_blue.onPrimary
                },
                autoHide: true,
                swipeable: true
            })
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 2500);

        setTimeout(() => {
            navigation?.navigate('Login')
        }, 2500)
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.dark_blue.background, paddingTop: 0 }}>
            <View style={{ zIndex: 99, position: 'relative', top: -30 }}>
                <Toast config={toastDarkMode} />
            </View>
            <View style={{ justifyContent: 'space-between', paddingTop: RFPercentage(0) }}>
                <View style={{ gap: RFPercentage(3) }}>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: RFPercentage(1) }}>
                        <Text style={{ fontSize: RFValue(20), fontFamily: FONTS.Worksans, color: COLORS.light_blue.onPrimary }}> Nova Conta </Text>
                        <Text style={{ fontSize: RFValue(16), fontFamily: FONTS.Roboto, color: COLORS.light_blue.surfaceVariant }}> Cadastro </Text>
                    </View>
                    <KeyboardAvoidingView>
                        <Formik initialValues={formValues} validationSchema={RegisterSchema} onSubmit={handleSendForm}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'flex-start', gap: RFPercentage(2) }}>
                                        <TextInput
                                            label={"Nome *"}
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            mode='outlined'
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon color={COLORS.light_blue.onPrimary} icon="view-headline" />}
                                            theme={ThemeDark}
                                        />
                                        {errors.name && (
                                            <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.dark_blue.error, fontSize: RFValue(10) }}> {errors.name} </Text>
                                        )}

                                        <TextInput
                                            label={"Sobre Nome * "}
                                            mode='outlined'
                                            value={values.lastname}
                                            onChangeText={handleChange('lastname')}
                                            onBlur={handleBlur('lastname')}
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon icon="view-headline" color={COLORS.light_blue.onPrimary} />}
                                            theme={ThemeDark}
                                        />

                                        {errors.lastname && (
                                            <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.dark_blue.error, fontSize: RFValue(10) }}> {errors.lastname} </Text>
                                        )}

                                        <TextInput
                                            label={"Email *"}
                                            mode='outlined'
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon color={COLORS.light_blue.onPrimary} icon="email" />}
                                            theme={ThemeDark}
                                        />

                                        {errors.email && (
                                            <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.dark_blue.error, fontSize: RFValue(10) }}> {errors.email} </Text>
                                        )}

                                        <TextInput
                                            label={"Senha *"}
                                            mode='outlined'
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('email')}
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon icon="lock" color={COLORS.light_blue.onPrimary} />}
                                            right={<TextInput.Icon color={COLORS.light_blue.onPrimary} icon={hidden ? "eye" : "eye-off"} onPress={handleShowPassword} />}
                                            secureTextEntry={hidden ? false : true}
                                            theme={ThemeDark}
                                        />

                                        {errors.password && (
                                            <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.dark_blue.error, fontSize: RFValue(10), width: RFPercentage(40) }}> {errors.password} </Text>
                                        )}

                                        <TextInput
                                            label={"Confirme a Senha *"}
                                            mode='outlined'
                                            value={values.confirmPassword}
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon icon="lock" color={COLORS.light_blue.onPrimary} />}
                                            right={<TextInput.Icon color={COLORS.light_blue.onPrimary} icon={hidden ? "eye" : "eye-off"} onPress={handleShowPassword} />}
                                            secureTextEntry={hidden ? false : true}
                                            theme={ThemeDark}
                                        />

                                        {errors.confirmPassword && (
                                            <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.dark_blue.error, fontSize: RFValue(10) }}> {errors.confirmPassword} </Text>
                                        )}

                                        <View style={{ flexDirection: 'row', gap: RFPercentage(1), alignItems: 'center', }}>
                                            <View style={{ flexDirection: 'row', gap: -2 }}>
                                                <TouchableOpacity>
                                                    <Text style={styles.EmpashisText}> Termos de Uso </Text>
                                                </TouchableOpacity>
                                                <Text style={{ fontSize: RFValue(13), fontFamily: FONTS.Roboto, color: COLORS.light_blue.surfaceVariant }}> e </Text>
                                                <TouchableOpacity>
                                                    <Text style={{ fontSize: RFValue(13), fontFamily: FONTS.Roboto, color: COLORS.dark_blue.secondary, textDecorationLine: 'underline' }}> Privacidade </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Checkbox
                                                onPress={() => { setChecked(!checked) }}
                                                status={checked ? 'checked' : 'unchecked'}
                                                theme={ThemeDark}
                                            />
                                        </View>
                                        {errors.checkTerms && (
                                            <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.dark_blue.error, fontSize: RFValue(10) }}> {errors.checkTerms} </Text>
                                        )}
                                    </View>


                                    <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFPercentage(2), marginTop: RFPercentage(5) }}>
                                        <Button onPress={() => handleSubmit()} theme={ThemeLight} mode='contained' style={{ width: RFPercentage(40), }}>
                                            {isLoading ? (
                                                <ActivityIndicator color={COLORS.light_blue.onPrimary} />
                                            ) : (
                                                <Text style={styles.buttonTxt}> Cadastrar </Text>
                                            )}
                                        </Button>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    EmpashisText: {
        fontSize: RFValue(13),
        fontFamily: FONTS.Roboto,
        color: COLORS.dark_blue.secondary,
        textDecorationLine: 'underline'
    },
    buttonTxt: {
        fontFamily: FONTS.Worksans,
        color: COLORS.light_blue.onPrimary,
        textTransform: 'uppercase',
        fontSize: RFValue(15)
    }
});

export default Register
