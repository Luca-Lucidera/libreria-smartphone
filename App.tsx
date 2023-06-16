import React from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createTheme,
  ThemeProvider,
  Button,
  Icon,
  LinearProgress,
  Text,
} from "@rneui/themed";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { useUserStore } from "./store/userStore";
import { View } from "react-native";
import { LoginResponse } from "./model/loginResponse";
import Cookies from "js-cookie";

const theme = createTheme({
  darkColors: {
    background: "#272727", //B2EDC5 #272727
    primary: "#B2EDC5",
    secondary: "#5688C7",
  },
  mode: "dark",
});

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const userStore = useUserStore();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!userStore.user) {
      setLoading(true);
      loginViaSession()
        .then((logged) => console.log(logged))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    async function loginViaSession() {
      let token = await SecureStore.getItemAsync("refresh_token");
      console.log(token);
      if (!token) return false;
      Cookies.set("refresh_token", token);
      const res = await fetch(
        "https://mia-libreria.vercel.app/api/auth/session",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.status !== 200) {
        console.log(data);
        return false;
      }
      const { accessToken, ...user } = data as LoginResponse;
      userStore.setAccessToken(accessToken);
      userStore.setUser(user);
      return true;
    }
  }, []);

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          backgroundColor: theme.darkColors?.background,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "70%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text h2 style={{ color: theme.darkColors?.primary }}>
            Caricamento
          </Text>
          <LinearProgress
            color={theme.darkColors?.secondary}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: theme.darkColors?.background },
            headerTitleStyle: { color: theme.darkColors?.primary },
            headerTitleAlign: "center",
            headerRight: () => (
              <Button size="lg" type="clear">
                <Icon name="logout" color={theme.darkColors?.secondary} />
              </Button>
            ),
          }}
        >
          {!userStore.user ? (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen name="Home" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
