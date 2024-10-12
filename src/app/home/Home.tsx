import { View, Text, Image, FlatList } from 'react-native'
import React, { lazy, Suspense } from 'react'
import { globalStyles } from '~/constants/global'
import { getMyData } from '~/services/api/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Return_FoundUser } from '~/utils/interfaces/api_response_interface'
import { ActivityIndicator, Avatar } from 'react-native-paper'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '~/constants/fonts'
import Navegation_Bar from '~/components/navegation_bar/Navegation_Bar'
import { COLORS } from '~/constants/colors'
import { home_navegation } from '~/utils/interfaces/global_interface'
import Home_Card from '~/components/home_card/HomeCard'
import { routeProps } from '~/utils/interfaces/navigation_interface'
import { Req_Status } from '~/utils/enums/status'

const Home = ({ navigation }: routeProps) => {
  const [userToken, setUserToken] = React.useState<string | null>(null)
  const [userAPIData, setUserApiData] = React.useState<Return_FoundUser | null>(null)
  const [userAddressData, setUserAdressData] = React.useState<Return_FoundUser | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [homeOptions, setHomeOptions] = React.useState<home_navegation[]>([
    {
      name: "Produtos",
      icon: "warehouse",
      route: "Products",
      disabled: false,
    },
    {
      name: "Financeiro",
      icon: "wallet",
      route: "Finance",
      disabled: false,
    },
    {
      name: "Endereços",
      icon: "map",
      route: "Addresses",
      disabled: false,
    },
    {
      name: "Ajustes",
      icon: "cog",
      route: "Settings",
      disabled: false,
    },
    {
      name: "...",
      icon: "progress-question",
      route: "...",
      disabled: true,
    },
    {
      name: "...",
      icon: "progress-question",
      route: "...",
      disabled: true,
    }
  ])

  React.useEffect(() => {
    async function checkData() {
      setIsLoading(true)
      const userToken = await AsyncStorage.getItem("@USER_TOKEN")
      const userID = await AsyncStorage.getItem("@USER_ID")

      if (userToken && userID) {
        setUserToken(userToken)
        await getMyData(userID, userToken).then((res) => {
          if (!res) {
            setIsLoading(false)
            console.log("Erro ao buscar dados do usuário")
            navigation?.navigate("Login")
          } else {
            switch (res.status) {
              case Req_Status.OK:
                setUserApiData(res.data.found)
                setUserAdressData(res.data.addresses)
                break
              case Req_Status.UNAUTHORIZED:
                console.log("Erro ao buscar dados do usuário")
                navigation?.navigate("Login")
                break
              default:
                console.log("Erro ao buscar dados do usuário")
                navigation?.navigate("Login")
                break
            }
          }
        }).catch((err) => {
          setIsLoading(false)
          console.log(err)
          navigation?.navigate("Login")
        }).finally(() => {
          setIsLoading(false)
        })
      }
    }

    checkData();
  }, [userToken, userAPIData])

  return (
    <View style={[globalStyles.container, { marginTop: RFPercentage(2) }]}>
      <View style={{ marginHorizontal: RFPercentage(3) }}>
        <Navegation_Bar
          userProfileURL={userAPIData?.profile.avatarUrl} userName={`${userAPIData?.firstName} ${userAPIData?.lastName}`} />

        <View>
          <Text style={{ fontSize: RFPercentage(3), fontFamily: FONTS.Worksans, color: COLORS.orangePrimary }}> Card do Meu Endereço </Text>
          {/* Flat List Horizontal*/}
        </View>

        <View>
          <FlatList
            data={homeOptions}
            renderItem={({ item }) => <Home_Card
              name={item.name}
              icon={item.icon}
              route={item.route}
              disabled={item.disabled} />}
            keyExtractor={(item) => item.name}
            columnWrapperStyle={{ gap: RFPercentage(5), justifyContent: 'center', alignItems: 'center', marginVertical: RFPercentage(3) }}
            numColumns={2}
          />
        </View>
      </View>
    </View>
  )
}

export default Home