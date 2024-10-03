import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles, ThemeDark, ThemeLight } from '~/constants/global'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
import { COLORS } from '~/constants/colors'
import { Button, Divider, TextInput } from 'react-native-paper'
import { Cursor } from 'phosphor-react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { routeProps } from '~/utils/interfaces/navigation_interfaces'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { loginProps } from '~/utils/interfaces/login_interface'
import Toast from 'react-native-toast-message'
import { doLogin } from '~/services/api/auth'
import { toastDarkMode } from '~/utils/configs/toast'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation, route }: routeProps) => {
    const [hidden, setHidden] = React.useState<boolean>(false)
    const [savedEmail, setSavedEmail] = React.useState<string>('')
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
        } catch (error) {
            console.error("Erro ao Salvar Dados:", error);
            setHasSavedData(false)
        }
    }

    async function returnUserLoginData() {
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
        }
    }

    function showWarning(values: loginProps) {
        Alert.alert("Atenção", "Deseja Salvar Dados de Acesso?", [
            { text: "Sim", onPress: () => saveLoginData(values) },
            { text: "Não" },
        ])
    }

    async function handleLogin(values: loginProps) {
        setIsLoading(true);

        const formattedValues = {
            email: savedEmail || values.email,
            password: savedPassword || values.password
        };

        Toast.show({
            type: "info",
            position: 'top',
            text1: "Atenção",
            text1Style: {
                textAlign: 'center',
                fontFamily: FONTS.Worksans,
                fontSize: RFValue(12),
                color: COLORS.light_blue.surface
            },
            text2: "Realizando Login",
            text2Style: {
                textAlign: 'center',
                fontFamily: FONTS.Worksans,
                fontSize: RFValue(12),
                color: COLORS.light_blue.onPrimary
            },
            autoHide: true,
            swipeable: true
        });

        try {
            const isDoneLogin = await doLogin(formattedValues);

            switch (isDoneLogin.message) {
                case "Login Realizado com Sucesso":
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: "Sucesso",
                        text1Style: {
                            textAlign: 'center',
                            fontFamily: FONTS.Worksans,
                            fontSize: RFValue(12),
                            color: COLORS.light_blue.surface
                        },
                        text2: "Login Realizado!",
                        text2Style: {
                            textAlign: 'center',
                            fontFamily: FONTS.Worksans,
                            fontSize: RFValue(12),
                            color: COLORS.light_blue.onPrimary
                        },
                        autoHide: true,
                        swipeable: true
                    });

                    if (!hasSavedData) {
                        showWarning(values);
                    }

                    await AsyncStorage.setItem("@User_Data", JSON.stringify(isDoneLogin.data));                    
                    // await AsyncStorage.setItem("@User_TOKEN", JSON.stringify(isDoneLogin.data.token))
                    navigation?.navigate("Home")
                    break;

                case "Falha ao Logar":
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
                        text2: "Usuário ou senha incorretos.",
                        text2Style: {
                            textAlign: 'center',
                            fontFamily: FONTS.Worksans,
                            fontSize: RFValue(12),
                            color: COLORS.light_blue.onPrimary
                        },
                        autoHide: true,
                        swipeable: true
                    });
                    break;

                case "Erro Interno":
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
                        text2: "Falha Interna",
                        text2Style: {
                            textAlign: 'center',
                            fontFamily: FONTS.Worksans,
                            fontSize: RFValue(12),
                            color: COLORS.light_blue.onPrimary
                        },
                        autoHide: true,
                        swipeable: true
                    });
                    break;

                default:
                    Toast.show({
                        type: "error",
                        position: 'top',
                        text1: "Atenção",
                        text1Style: {
                            textAlign: 'center',
                            fontFamily: FONTS.Worksans,
                            fontSize: RFValue(12),
                            color: COLORS.light_blue.surface
                        },
                        text2: "Ocorreu um Erro ao Logar",
                        text2Style: {
                            textAlign: 'center',
                            fontFamily: FONTS.Worksans,
                            fontSize: RFValue(12),
                            color: COLORS.light_blue.onPrimary
                        },
                        autoHide: true,
                        swipeable: true
                    });
                    break;
            }
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            Toast.show({
                type: "error",
                position: 'top',
                text1: "Atenção",
                text1Style: {
                    textAlign: 'center',
                    fontFamily: FONTS.Worksans,
                    fontSize: RFValue(12),
                    color: COLORS.light_blue.surface
                },
                text2: "Ocorreu um Erro ao Logar",
                text2Style: {
                    textAlign: 'center',
                    fontFamily: FONTS.Worksans,
                    fontSize: RFValue(12),
                    color: COLORS.light_blue.onPrimary
                },
                autoHide: true,
                swipeable: true
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
                }
            })
        }

        checkData()

        opacity.value = withTiming(1, { duration: 1500 })
    }, [])

    function handleShowPassword() {
        setHidden(!hidden)
    }

    return (
        <>
            <View style={{ zIndex: 99, position: 'relative', top: -30 }}>
                <Toast config={toastDarkMode} />
            </View>
            <View style={[globalStyles.container, { backgroundColor: COLORS.dark_blue.background, justifyContent: 'space-between' }]}>
                <View style={{ gap: RFPercentage(3) }}>
                    <KeyboardAvoidingView>
                        <Formik initialValues={loginValues} onSubmit={handleLogin}>
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: RFPercentage(5) }}>
                                        <Text style={{ fontSize: RFValue(20), fontFamily: FONTS.Worksans, color: COLORS.light_blue.onPrimary }}> Home Stock </Text>
                                        <Text style={{ fontSize: RFValue(16), fontFamily: FONTS.Roboto, color: COLORS.light_blue.surfaceVariant }}> Login </Text>
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFPercentage(2) }}>
                                        <TextInput
                                            label={"Email"}
                                            mode='outlined'
                                            value={savedEmail ? savedEmail : values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon color={COLORS.light_blue.onPrimary} icon="email" />}
                                            theme={ThemeDark}
                                        />

                                        <TextInput
                                            label={"Senha"}
                                            mode='outlined'
                                            value={savedPassword ? savedPassword : values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            style={{ width: RFPercentage(40) }}
                                            left={<TextInput.Icon icon="lock" color={COLORS.light_blue.onPrimary} />}
                                            right={<TextInput.Icon color={COLORS.light_blue.onPrimary} icon={hidden ? "eye" : "eye-off"} onPress={handleShowPassword} />}
                                            secureTextEntry={hidden ? false : true}
                                            theme={ThemeDark}
                                        />
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', gap: RFPercentage(2), marginTop: RFPercentage(5) }}>
                                        <Button theme={ThemeLight} mode='contained' style={{ width: RFPercentage(40), }} onPress={() => handleSubmit()}>
                                            {isLoading ? (
                                                <ActivityIndicator color={COLORS.light_blue.onPrimary} />
                                            ) : (
                                                <Text style={{ fontFamily: FONTS.Worksans, color: COLORS.light_blue.onPrimary, textTransform: 'uppercase', fontSize: RFValue(15) }}> Acessar </Text>
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

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: COLORS.dark_blue.backdrop, padding: RFPercentage(3), gap: RFPercentage(3) }}>
                    <Animated.Image source={imageSRC} style={[AnimatedOpacityStyle, { height: RFValue(200), width: RFValue(250), resizeMode: 'cover' }]} />


                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: RFPercentage(3), gap: RFPercentage(1) }}>
                        <Text style={{ fontSize: RFValue(15), fontFamily: FONTS.Worksans, color: COLORS.light_blue.onPrimary, letterSpacing: -1 }}>
                            Não Tem uma conta ?
                        </Text>
                        <TouchableOpacity onPress={() => navigation?.navigate("Register")}>
                            <Text style={{ fontSize: RFValue(15), fontFamily: FONTS.Worksans, fontWeight: 'bold', color: COLORS.light_blue.primary }}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Login