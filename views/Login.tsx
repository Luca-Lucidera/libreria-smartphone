import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { View } from "react-native";
import { Text, useTheme, makeStyles, Input, Button, Icon } from "@rneui/themed";
import * as React from "react";
import { LoginResponse } from "../model/loginResponse";
import { ErrorResponse } from "../model/errorResponse";
import { useUserStore } from "../store/userStore";
import Cookies from "js-cookie";
import * as SecureStore from "expo-secure-store";
import { praseCookies } from "../utils/parseCookie";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export const Login = ({ navigation, route }: Props) => {
  const { theme } = useTheme();
  const styles = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const userStore = useUserStore();

  async function handleSubmit() {
    setError(null);
    setLoading(true);

    const res = await fetch("https://mia-libreria.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const body = await res.json();

    if (res.status !== 200) {
      const error = body as ErrorResponse;
      setError(error.statusMessage);
    } else {
      const { accessToken, ...user } = body as LoginResponse;
      console.log(res.headers.get("set-cookie"));
      const refresh_token = praseCookies(
        res.headers.get("set-cookie")!,
        "refresh_token"
      );
      console.log(refresh_token);
      if (!refresh_token) {
        setLoading(false);
        return;
      }
      await SecureStore.setItemAsync("refresh_token", refresh_token);
      userStore.setAccessToken(accessToken);
      userStore.setUser(user);
    }
    setLoading(false);
  }

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text h2>LIBRERIA</Text>
      <Input
        label="EMAIL"
        labelProps={{ style: { color: theme.colors.primary } }}
        value={email}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={<Icon name="email" size={25} />}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        label="PASSWORD"
        labelProps={{ style: { color: theme.colors.primary } }}
        secureTextEntry={true}
        value={password}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={<Icon name="lock" size={25} />}
      />
      {error && (
        <Text h3 style={{ ...styles.errorMessage, color: theme.colors.error }}>
          {error}
        </Text>
      )}
      <Button
        onPress={handleSubmit}
        loading={loading}
        buttonStyle={styles.loginButton}
        color={theme.colors.primary}
        titleStyle={{ color: theme.colors.background }}
      >
        Login
        <Icon
          name="login"
          size={25}
          color={theme.colors.background}
          iconStyle={{ paddingLeft: 10 }}
        />
      </Button>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    width: 200,
    height: 50,
    borderRadius: 10,
  },
  errorMessage: {
    marginBottom: 20,
  },
}));
