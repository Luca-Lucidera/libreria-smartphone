import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { FlatList, ScrollView, View } from "react-native";
import { Text, useTheme, makeStyles, Input, Button, Icon } from "@rneui/themed";
import * as React from "react";
import { useUserStore } from "../store/userStore";
import { Libro } from "../model/libro";
import { TableHeader } from "../model/tableHeader";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const Home = ({ navigation, route }: Props) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const userStore = useUserStore();
  const [loading, setLoading] = React.useState(false);

  const [libri, setLibri] = React.useState<Libro[]>([]);
  const [headers, setHeaders] = React.useState<TableHeader[]>([]);
  const [publishers, setPublishers] = React.useState<string[]>([]);
  const [types, setTypes] = React.useState<string[]>([]);
  const [statuses, setStatuses] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLoading(true);
    fetchAll().finally(() => setLoading(false));
    async function fetchAll() {
      try {
        const [libri, headers, publishers, types, statuses] = await Promise.all(
          [
            fetch("https://mia-libreria.vercel.app/api/books", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + userStore.accessToken,
              },
              credentials: "include",
            }).then((resp) => resp.json() as Promise<Libro[]>),
            fetch("https://mia-libreria.vercel.app/api/table/headers").then(
              (resp) => resp.json() as Promise<TableHeader[]>
            ),
            fetch("https://mia-libreria.vercel.app/api/filter/publisher").then(
              (resp) => resp.json() as Promise<string[]>
            ),
            fetch("https://mia-libreria.vercel.app/api/filter/type").then(
              (resp) => resp.json() as Promise<string[]>
            ),
            fetch("https://mia-libreria.vercel.app/api/filter/status").then(
              (resp) => resp.json() as Promise<string[]>
            ),
          ]
        );
        setLibri(libri);
        setHeaders(headers);
        setPublishers(publishers);
        setTypes(types);
        setStatuses(statuses);
      } catch (error) {
        console.log("ERRORE FETCH ALL -> :", error);
      }
    }
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      style={{ backgroundColor: theme.colors.background }}
      data={libri}
      renderItem={({ item: libro, index }) => <TextLibro libro={libro} />}
      numColumns={2}
    ></FlatList>
  );
};

const TextLibro = ({ libro }: { libro: Libro }) => <Text>{libro.title}</Text>;

const useStyles = makeStyles((theme) => ({
  loginButton: {
    width: 200,
    height: 50,
    borderRadius: 10,
  },
}));
