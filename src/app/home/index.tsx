import { View, Text } from 'react-native'
import React, { lazy, Suspense } from 'react'
import { globalStyles } from '~/constants/global'
import { getMyData } from '~/services/api/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FoundUser, UserDataLogin } from '~/utils/interfaces/api_response_interface'
import { ActivityIndicator, Avatar } from 'react-native-paper'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
const Navegation_Bar = lazy(async () => import('~/components/navegation_bar'));

const Home = () => {
  const [userToken, setUserToken] = React.useState<string | null>(null)
  const [userData, setUserData] = React.useState<UserDataLogin | null>(null)
  const [userAPIData, setUserApiData] = React.useState<FoundUser | null>(null)

  React.useEffect(() => {
    async function checkData() {
      try {
        const userStoredData = await AsyncStorage.getItem("@User_Data")

        if (userStoredData) {
          const parsedData = JSON.parse(userStoredData)

          const { token, ...rest } = parsedData;

          setUserToken(token)
          setUserData(rest.userData as UserDataLogin)

          // todo: adicionar a interface do userData
          // console.log("Restante dos dados:", rest.userData); caso queira retornar os dados tipo , role, id                
        }

      } catch (error) {
        console.error("Erro ao Acessar o AsyncStorage:", error)
      } finally {
        if (userData?.id && userToken) {
          await getMyData(userData?.id, userToken).then((res) => {
            if (res?.message === "Dados Retornados com Sucesso") {
              setUserApiData(res.data.found)
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      }
    }

    checkData();
  }, [userData, userToken])

  return (
    <View style={[globalStyles.container, {marginHorizontal: RFPercentage(2)}]}>
      <Suspense>
        <Navegation_Bar userData={userAPIData as FoundUser} />
      </Suspense>

      <View>
        <Text style={{ fontSize: RFPercentage(3) , fontFamily: FONTS.Worksans}}> Ações </Text>
        {/* Flat List Horizontal*/}
      </View>

      <View>
        <Text style={{ fontSize: RFPercentage(3), fontFamily: FONTS.Worksans }}> Produtos em Falta </Text>
        {/* Flat List Vertical */}
      </View>
    </View>
  )
}

export default Home