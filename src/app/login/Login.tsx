import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles, ThemeDark, ThemeLight } from '~/constants/global'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
import { COLORS } from '~/constants/colors'
import { Button, Divider, TextInput } from 'react-native-paper'
import { Cursor } from 'phosphor-react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { routeProps } from '~/utils/interfaces/navigation_interface'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-toast-message'
import { doLogin, loginProps } from '~/services/api/auth'
import { toastDarkMode } from '~/utils/configs/toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosResponse } from 'axios'
import { Return_UserLogin } from '~/utils/interfaces/api_response_interface'
import { Req_Status } from '~/utils/enums/status'

export async function saveToken(token: string) {
    try {
        const asyncToken = await AsyncStorage.setItem("@USER_TOKEN", token);
        return { message: "Token Salvo com Sucesso", data: asyncToken }
    } catch (error) {
        return { message: "Erro ao Salvar Token", data: error }
    }
}

export async function saveUserId(id: string) {
    try {
        const asyncId = await AsyncStorage.setItem("@USER_ID", id);
        return { message: "ID Salvo com Sucesso", data: asyncId }
    } catch (error) {
        return { message: "Erro ao Salvar ID", data: error }
    }
}

const Login = ({ navigation, route }: routeProps) => {
    const [hidden, setHidden] = React.useState<boolean>(false)
    const [savedEmail, setSavedEmail] = React.useState<string>('')
    const [isCheckingData, setIsCheckingData] = React.useState<boolean>(false)
    const [savedPassword, setSavedPassword] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [hasSavedData, setHasSavedData] = React.useState<boolean>(false)

    const imageSRC = require('~/assets/png/Login-rafiki.png')
    const opacity = useSharedValue(0);

    const loginValues: loginProps = {
        email: '',
        password: ''
    }

    async function saveLoginData(values: loginProps) {
        try {
            setHasSavedData(true)
            const formattedData = {
                email: values.email,
                password: values.password
            }

            console.log("Salvando Dados no Async");
            await AsyncStorage.setItem("@UserLogin", JSON.stringify(formattedData))
            console.log("Dados Salvos com Sucesso")
            navigation?.navigate("Auth_Routes")
        } catch (error) {
            console.error("Erro ao Salvar Dados:", error);
            setHasSavedData(false)
        }
    }

    async function returnUserLoginData() {
        setIsCheckingData(true)
        try {
            const data = await AsyncStorage.getItem("@UserLogin");
            if (data !== null) {
                const parsedData = JSON.parse(data);
                setHasSavedData(true)
                return parsedData;
            } else {
                console.log("Nenhum dado encontrado.");
                setHasSavedData(false)
                return null;
            }
        } catch (error) {
            console.error("Erro ao retornar dados:", error);
            setHasSavedData(false)
            return null;
        } finally {
            setIsCheckingData(false)
        }
    }

    function showWarning(values: loginProps) {
        Alert.alert("Atenção", "Deseja Salvar Dados de Acesso?", [
            { text: "Sim", onPress: () => saveLoginData(values) },
            { text: "Não", onPress: () => navigation?.navigate("Auth_Routes") },
        ])
    }
    

    async function handleLogin(values: loginProps) {
        setIsLoading(true);

        const formattedValues = {
            email: values.email,
            password: values.password
        };

        try {
            const LoginResponse = await doLogin(formattedValues);
            console.log(LoginResponse.status);
            switch (LoginResponse.status) {
                case Req_Status.OK:
                    const successResponse: Return_UserLogin = LoginResponse.data
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

                    const tokenResponse = await saveToken(successResponse.token)
                    const userIdResponse = await saveUserId(successResponse.userData.id)

                    if (tokenResponse.message === "Token Salvo com Sucesso" && userIdResponse.message === "ID Salvo com Sucesso") {
                        if(hasSavedData) {
                            navigation?.navigate("Auth_Routes")
                        } else {
                            return showWarning(values)
                        }
                    }
                case Req_Status.UNAUTHORIZED:
                    return Toast.show({
                        type: 'error',
                        position: 'top',
                        autoHide: true,
                        swipeable: true,
                        text1: "Atenção",
                        text1Style: globalStyles.defaultToast1Text,
                        text2: LoginResponse.data.message,
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
        } catch (error) {
            Toast.show({
                type: "error",
                position: 'top',
                autoHide: true,
                swipeable: true,
                text1: "Atenção",
                text1Style: globalStyles.defaultToast1Text,
                text2: "Ocorreu um Erro ao Logar",
                text2Style: globalStyles.defaultToast2Text,
            });
        } finally {
            setIsLoading(false);
        }
    }

    const AnimatedOpacityStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value, }
    });

    React.useEffect(() => {
        const checkData = async () => {
            await returnUserLoginData().then((data) => {
                if (data !== null) {
                    setSavedEmail(data.email)
                    setSavedPassword(data.password)
                } else {
                    setSavedEmail('')
                    setSavedPassword('')
                }
            })
        }

        checkData()

        opacity.value = withTiming(1, { duration: 1500 })
    }, [savedEmail, savedPassword])

    function handleShowPassword() {
        setHidden(!hidden)
    }

    return (
        <>
            <View style={{ zIndex: 99, position: 'relative', top: RFValue(25) }}>
                <Toast config={toastDarkMode} />
            </View>
            <View style={[globalStyles.container, { backgroundColor: COLORS.bgColor, justifyContent: 'space-between' }]}>
                <View style={{ gap: RFPercentage(3) }}>
                    <KeyboardAvoidingView>
                        <Formik initialValues={loginValues} onSubmit={handleLogin}>
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: RFPercentage(5) }}>
                                        <Text style={{ fontSize: RFValue(20), fontFamily: FONTS.Worksans, color: COLORS.whiteTxt }}> Home Stock </Text>
                                        <Text style={{ fontSize: RFValue(16), fontFamily: FONTS.Roboto, color: COLORS.whiteSecondary }}> Login </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFPercentage(2) }}>
                                        <TextInput
                                            label={isCheckingData ? "Verificando Email" : "Email"}
                                            mode='outlined'
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon color={COLORS.whitePrimary} icon="email" />}
                                            theme={ThemeDark}
                                        />

                                        <TextInput
                                            label={isCheckingData ? "Verificando Senha" : "Senha"}
                                            mode='outlined'
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon icon="lock" color={COLORS.whitePrimary} />}
                                            right={<TextInput.Icon color={COLORS.whitePrimary} icon={hidden ? "eye" : "eye-off"} onPress={handleShowPassword} />}
                                            secureTextEntry={hidden ? false : true}
                                            theme={ThemeDark}
                                        />
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFPercentage(2), marginTop: RFPercentage(5) }}>
                                        <Button theme={ThemeLight} mode='contained' style={{ width: RFPercentage(40), }} onPress={() => handleSubmit()}>
                                            {isLoading ? (
                                                <ActivityIndicator color={COLORS.whitePrimary} />
                                            ) : (
                                                <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.whiteTxt, textTransform: 'uppercase', fontSize: RFValue(15) }}> Acessar </Text>
                                            )}
                                        </Button>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>

                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Divider bold={true} theme={ThemeDark} style={{ width: RFPercentage(40) }} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: COLORS.loginSecondary, padding: RFPercentage(3), gap: RFPercentage(3) }}>
                    <Animated.Image source={imageSRC} style={[AnimatedOpacityStyle, { height: RFValue(200), width: RFValue(250), resizeMode: 'cover' }]} />


                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: RFPercentage(3), gap: RFPercentage(1) }}>
                        <Text style={{ fontSize: RFValue(15), fontFamily: FONTS.Worksans, color: COLORS.whiteTxt, letterSpacing: -1 }}>
                            Não Tem uma conta ?
                        </Text>
                        <TouchableOpacity onPress={() => navigation?.navigate("Register")}>
                            <Text style={{ fontSize: RFValue(15), fontFamily: FONTS.Worksans, fontWeight: 'bold', color: COLORS.bluePrimary }}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Login