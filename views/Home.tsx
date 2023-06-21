import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Animated, FlatList, Pressable, View } from "react-native";
import {
  Text,
  useTheme,
  makeStyles,
  Input,
  Button,
  Icon,
  Card,
  Dialog,
  LinearProgress,
} from "@rneui/themed";
import { useState } from "react";
import { Libro } from "../model/libro";
import { ScrollView } from "react-native-gesture-handler";
import { Loading } from "../components/Loading";
import useLibri from "../hooks/useLibri";
import { SafeAreaView } from "react-native-safe-area-context";
import useFilters from "../hooks/useFilters";
import { Picker } from "@react-native-picker/picker";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const Home = ({ navigation, route }: Props) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const { libri, loading: loadingLibri, error, ...func } = useLibri();
  if (loadingLibri) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.background, height: "100%" }}
    >
      <FlatList
        data={libri}
        renderItem={({ item: libro, index }) => (
          <CardLibro libro={libro} key={libro.id} />
        )}
        numColumns={2}
      ></FlatList>
    </SafeAreaView>
  );
};

const CardLibro = ({ libro }: { libro: Libro }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [libroDaModificare, setLibroDaModificare] = useState<Libro>({
    id: "",
    title: "",
    purchased: 1,
    read: 0,
    type: "MANGA",
    status: "Plan To Read",
    publisher: "JPOP",
    price: 1,
    rating: 0,
    comment: "",
  });
  const { loading, publishers, statuses, types } = useFilters();

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [modifica, setModifica] = useState(false);
  const showAltroDialog = (libro: Libro) => {
    setLibroDaModificare(libro);
    setModalVisible(true);
  };
  const toggleModifica = async () => {
    if (modifica) {
      console.log(libroDaModificare);
    }
    setModifica(!modifica);
  };
  const animated = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const deleteBook = async (idLibro: string) => {
    setDeleteModalVisible(false);
  };

  if (loading) return <Loading />;
  return (
    <View>
      <Pressable
        onLongPress={() => setDeleteModalVisible(true)}
        onPressIn={fadeIn}
        onPressOut={fadeOut}
      >
        <Card containerStyle={{ width: 170, maxHeight: 190, borderRadius: 10 }}>
          <Animated.View
            style={{
              opacity: animated,
            }}
          >
            <Card.Title>
              <Text>{libro.title}</Text>
            </Card.Title>
            <Text>Comprati: {libro.purchased}</Text>
            <Text>Letti: {libro.purchased}</Text>
            <Text>Prezzo: {libro.price}€</Text>
            <Button
              onPress={() => showAltroDialog(libro)}
              buttonStyle={styles.altroButton}
              titleStyle={{ color: theme.colors.background }}
            >
              Altro
            </Button>
          </Animated.View>
        </Card>
      </Pressable>
      <Dialog
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{ backgroundColor: theme.colors.background, borderRadius: 10 }}
      >
        <ScrollView>
          {modifica ? (
            <>
              <Input
                label="TITOLO"
                value={libroDaModificare.title}
                onChangeText={(text) =>
                  setLibroDaModificare({
                    ...libroDaModificare,
                    title: text,
                  })
                }
              />
              <Input
                label="COMPRATI"
                keyboardType="numeric"
                value={libroDaModificare.purchased.toString()}
                onChangeText={(text) => {
                  setLibroDaModificare({
                    ...libroDaModificare,
                    purchased: parseInt(text ? text : "1"),
                  });
                }}
                defaultValue="1"
              />
              <Input
                label="LETTI"
                keyboardType="numeric"
                value={libroDaModificare.read.toString()}
                onChangeText={(text) =>
                  setLibroDaModificare({
                    ...libroDaModificare,
                    read: parseInt(text ? text : "0"),
                  })
                }
              />
              <Picker
                selectedValue={libroDaModificare.type}
                onValueChange={(itemValue, itemIndex) =>
                  setLibroDaModificare({
                    ...libroDaModificare,
                    type: itemValue,
                  })
                }
                mode="dropdown"
                style={{ color: theme.colors.secondary }}
              >
                {types.slice(1).map((type, i) => (
                  <Picker.Item
                    label={type}
                    value={type}
                    key={`${type}-${i}`}
                    style={{ color: theme.colors.secondary }}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={libroDaModificare.status}
                onValueChange={(itemValue, itemIndex) =>
                  setLibroDaModificare({
                    ...libroDaModificare,
                    status: itemValue,
                  })
                }
                style={{ color: theme.colors.secondary }}
                mode="dropdown"
              >
                {statuses.slice(1).map((status, i) => (
                  <Picker.Item
                    label={status}
                    value={status}
                    key={`${status}-${i}`}
                    style={{ color: theme.colors.secondary }}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={libroDaModificare.publisher}
                onValueChange={(itemValue, itemIndex) =>
                  setLibroDaModificare({
                    ...libroDaModificare,
                    publisher: itemValue,
                  })
                }
                mode="dropdown"
                style={{ color: theme.colors.secondary }}
              >
                {publishers.slice(1).map((publisher, i) => (
                  <Picker.Item
                    color={theme.colors.secondary}
                    label={publisher}
                    value={publisher}
                    key={`${publisher}-${i}`}
                  />
                ))}
              </Picker>
              <Input
                label="Prezzo"
                keyboardType="numeric"
                value={libroDaModificare.price.toString()}
                onChangeText={(text) =>
                  setLibroDaModificare({
                    ...libroDaModificare,
                    price: parseFloat(text ? text : "0"),
                  })
                }
              />
              <Input
                label="Valutazione"
                value={libroDaModificare.rating.toString()}
                onChangeText={(text) => {
                  setLibroDaModificare({
                    ...libroDaModificare,
                    rating: parseFloat(text ? text : "0"),
                  });
                }}
                keyboardType="numeric"
              />
              <Input
                label="Commento"
                value={libroDaModificare.comment!}
                onChange={(e) => {
                  setLibroDaModificare({
                    ...libroDaModificare,
                    comment: e.nativeEvent.text,
                  });
                }}
              />
            </>
          ) : (
            <>
              <Dialog.Title
                title={libro.title}
                titleStyle={{ color: "white" }}
              />
              <Text>Comprati: {libro.purchased}</Text>
              <Text>Letti: {libro.read}</Text>
              <Text>Tipo: {libro.type}</Text>
              <Text>Status: {libro.status}</Text>
              <Text>Editore: {libro.publisher}</Text>
              <Text>Prezzo: {libro.price}€</Text>
              <Text>Valutazione: {libro.rating}</Text>
            </>
          )}

          <Dialog.Actions>
            <Dialog.Button
              title={modifica ? "CONFERMA MODIFICHE" : "MODIFICA"}
              onPress={() => toggleModifica()}
            />
          </Dialog.Actions>
        </ScrollView>
      </Dialog>
      <Dialog
        isVisible={deleteModalVisible}
        onBackdropPress={() => setDeleteModalVisible(false)}
        style={{ backgroundColor: theme.colors.background }}
      >
        <Dialog.Title
          title={"ATTENZIONE AREA PERICOLOSA!"}
          titleStyle={{ color: theme.colors.error }}
        />
        <Text>Attenzione, stai per eliminare il libro: "{libro.title}"</Text>
        <Dialog.Actions>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Dialog.Button
              title={"ANNULLA"}
              type="solid"
              onPress={() => setDeleteModalVisible(false)}
              buttonStyle={{
                marginLeft: 10,
              }}
              titleStyle={{ color: "black" }}
              iconRight={true}
              icon={
                <Icon
                  name="x"
                  type="feather"
                  style={{ marginLeft: 4 }}
                  color={"black"}
                />
              }
            />

            <Dialog.Button
              title={"ELIMINA"}
              titleStyle={{ color: theme.colors.error }}
              buttonStyle={{
                borderColor: theme.colors.error,
              }}
              iconRight={true}
              icon={
                <Icon
                  name="trash-2"
                  type="feather"
                  style={{ marginLeft: 4 }}
                  color={theme.colors.error}
                />
              }
              onPress={() => deleteBook(libro.id)}
            />
          </View>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  altroButton: {
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    borderRadius: 6,
  },
}));
