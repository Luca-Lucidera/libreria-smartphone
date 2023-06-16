import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { View } from "react-native";
import { Text, useTheme, makeStyles, Input, Button, Icon } from "@rneui/themed";
import * as React from "react";
import { useUserStore } from "../store/userStore";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const Home = ({ navigation, route }: Props) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const userStore = useUserStore();
  React.useEffect(() => {
    fetch("https://mia-libreria.vercel.app/api/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userStore.accessToken,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log("Home.tsx risposta libri: ", data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text h3>{JSON.stringify(userStore.user)}</Text>
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
}));
