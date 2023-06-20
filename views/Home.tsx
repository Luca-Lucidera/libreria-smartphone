import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Animated, FlatList, Pressable, ScrollView, View } from "react-native";
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
    // fetchAll().finally(() => setLoading(false));
    // async function fetchAll() {
    //   try {
    //     const [libri, headers, publishers, types, statuses] = await Promise.all(
    //       [
    //         fetch("https://mia-libreria.vercel.app/api/books", {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + userStore.accessToken,
    //           },
    //           credentials: "include",
    //         }).then((resp) => resp.json() as Promise<Libro[]>),
    //         fetch("https://mia-libreria.vercel.app/api/table/headers").then(
    //           (resp) => resp.json() as Promise<TableHeader[]>
    //         ),
    //         fetch("https://mia-libreria.vercel.app/api/filter/publisher").then(
    //           (resp) => resp.json() as Promise<string[]>
    //         ),
    //         fetch("https://mia-libreria.vercel.app/api/filter/type").then(
    //           (resp) => resp.json() as Promise<string[]>
    //         ),
    //         fetch("https://mia-libreria.vercel.app/api/filter/status").then(
    //           (resp) => resp.json() as Promise<string[]>
    //         ),
    //       ]
    //     );
    //     setLibri(libri);
    //     setHeaders(headers);
    //     setPublishers(publishers);
    //     setTypes(types);
    //     setStatuses(statuses);
    //   } catch (error) {
    //     console.log("ERRORE FETCH ALL -> :", error);
    //   }
    // }

    setLoading(true);
    setTimeout(() => {
      setLibri([
        {
          id: "3c9ec01d-02a5-4473-a3e1-188fba67d5ad",
          title: "Oshi No Ko",
          purchased: 7,
          read: 3,
          type: "Manga",
          status: "Reading",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "e22b2e7b-d4eb-4637-bf53-62dec833e6eb",
          title: "The Quintessential Quintuplets",
          purchased: 14,
          read: 14,
          type: "Manga",
          status: "Completed",
          publisher: "JPOP",
          price: 5.9,
          rating: 0,
          comment: "",
        },
        {
          id: "303a3c53-3f6c-4dab-a0ff-9c8a4a84b4cd",
          title: "Kaiju No 8",
          purchased: 4,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Star Comics",
          price: 5.5,
          rating: 0,
          comment: "",
        },
        {
          id: "d90e1c24-a9b2-47dd-b225-0bb790d746fb",
          title: "Nuvole a nordovest",
          purchased: 5,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 7.5,
          rating: 0,
          comment: "",
        },
        {
          id: "a32cdef0-506a-45a4-9b8f-b882d121950d",
          title: "21th Century Boys",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 14.9,
          rating: 0,
          comment: "",
        },
        {
          id: "0e1430cf-694b-43ed-951d-cd5acf0755f8",
          title: "Il duro lavoro di Musubu",
          purchased: 4,
          read: 4,
          type: "Manga",
          status: "Reading",
          publisher: "Star Comics",
          price: 5.9,
          rating: 0,
          comment: "",
        },
        {
          id: "810cd19b-6b87-4580-a779-b76983c4c978",
          title: "20th Century Boys",
          purchased: 11,
          read: 1,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 14.9,
          rating: 0,
          comment: "",
        },
        {
          id: "ab38d5db-e468-41d1-b99c-18746a78d108",
          title: "FULL METAL ALCHEMIST",
          purchased: 18,
          read: 1,
          type: "Manga",
          status: "Reading",
          publisher: "Planet Manga",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "3d42e890-bb23-4174-a019-1f721232b8bc",
          title: "World's End Harem",
          purchased: 12,
          read: 12,
          type: "Manga",
          status: "Completed",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "f33c84f9-ec69-492f-800d-cd3049527e96",
          title: "Horimiya",
          purchased: 16,
          read: 16,
          type: "Manga",
          status: "Completed",
          publisher: "JPOP",
          price: 5.9,
          rating: 0,
          comment: "",
        },
        {
          id: "2ff9e77c-b21a-428a-854b-bc85e9e01efe",
          title: "Shadows House",
          purchased: 11,
          read: 3,
          type: "Manga",
          status: "Reading",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "c39e1db6-732c-4f46-adff-ede6547c1e4b",
          title: "Frieren",
          purchased: 9,
          read: 1,
          type: "Manga",
          status: "Reading",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "111a464d-ad12-4657-8fb9-0def4b6f4aad",
          title: "Diari della speziale",
          purchased: 10,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "27e24b43-3165-42d1-bef4-305dcb02c821",
          title: "We never learn",
          purchased: 21,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 4.9,
          rating: 0,
          comment: "",
        },
        {
          id: "e21008e4-eafe-4096-bcb6-4f318c5ae177",
          title: "Tokyo revengers",
          purchased: 9,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 5.9,
          rating: 0,
          comment: "",
        },
        {
          id: "1d2e131e-f70a-47d3-83d1-08c236b35673",
          title: "Rent a aborto",
          purchased: 6,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 2,
          rating: 0,
          comment: " ",
        },
        {
          id: "7c1db1af-06b0-43fd-aa36-75ba7c162253",
          title: "Blue period",
          purchased: 10,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "59adcca9-4c77-4cc5-a783-d3751804bbb2",
          title: "Yona la principessa scarlatta",
          purchased: 17,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Star Comics",
          price: 4.5,
          rating: 0,
          comment: "",
        },
        {
          id: "63a97fc3-1428-4ea5-898d-d38f6d1beb9d",
          title: "Date a live Novel",
          purchased: 12,
          read: 0,
          type: "Light Novel",
          status: "Plan To Read",
          publisher: "Other",
          price: 10,
          rating: 0,
          comment: "",
        },
        {
          id: "059eefa9-fa33-4fd6-840f-bf97271fba0d",
          title: "Konosuba",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 4.9,
          rating: 0,
          comment: "",
        },
        {
          id: "1c79d566-b706-4ddb-aefa-c15277c40f11",
          title: "Bungo stray dogs",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 1,
          rating: 0,
          comment: "",
        },
        {
          id: "72391956-a23f-4447-b74f-fea7084bcba4",
          title: "JUJUTSU KAISEN",
          purchased: 2,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 4.9,
          rating: 0,
          comment: "",
        },
        {
          id: "87cf5514-a04b-4809-a998-b250b7adaffb",
          title: "Sakamoto days",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 5.2,
          rating: 0,
          comment: "",
        },
        {
          id: "324534d0-1400-4b96-922d-f9d4597c97b0",
          title: "Vita da slime",
          purchased: 1,
          read: 0,
          type: "Light Novel",
          status: "Plan To Read",
          publisher: "Dokusho",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "3e96b71b-6867-4d34-9bf6-f48eba3dbbc2",
          title: "Sweet Paprika",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Star Comics",
          price: 13.9,
          rating: 0,
          comment: "",
        },
        {
          id: "34f9c891-7201-4d46-9b8d-c53cdcab59ea",
          title: "Secchan",
          purchased: 1,
          read: 1,
          type: "Manga",
          status: "Completed",
          publisher: "JPOP",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "4eeac649-4a09-404a-8785-f83e777b6ece",
          title: "Spice and Wolf",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 12.9,
          rating: 0,
          comment: "",
        },
        {
          id: "d4c100c8-756b-4117-bee4-de3668c68fe3",
          title: ".Hack",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 7.5,
          rating: 0,
          comment: "",
        },
        {
          id: "189a4107-ccc0-44f1-b121-e7527b4deff5",
          title: "I am a hero",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 6.9,
          rating: 0,
          comment: "",
        },
        {
          id: "3ca4cd00-9ac5-4f85-b2dd-63a4c6d5baff",
          title: "Solo leveling",
          purchased: 3,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Star Comics",
          price: 8.9,
          rating: 0,
          comment: "",
        },
        {
          id: "a0060f24-0baa-4575-b850-e301ec42bca6",
          title: "Boy meets Maria",
          purchased: 1,
          read: 1,
          type: "Manga",
          status: "Completed",
          publisher: "Star Comics",
          price: 8.9,
          rating: 0,
          comment: "",
        },
        {
          id: "0acca730-a0be-494a-9914-81c014651db9",
          title: "Duca della morte",
          purchased: 2,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Goen",
          price: 5.95,
          rating: 0,
          comment: "",
        },
        {
          id: "21ae05c4-0ae6-4bb4-a8fd-02bbdd6a4b38",
          title: "Blue lock",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 7.5,
          rating: 0,
          comment: "",
        },
        {
          id: "a6039b60-8f11-4c8a-855c-dd1dce34f25f",
          title: "Spy x Family",
          purchased: 10,
          read: 9,
          type: "Manga",
          status: "Reading",
          publisher: "Planet Manga",
          price: 5.2,
          rating: 0,
          comment: "",
        },
        {
          id: "842e73d4-2d6f-4e37-800c-cad19e0f578a",
          title: "Trinity Seven",
          purchased: 12,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 5.9,
          rating: 0,
          comment: "",
        },
        {
          id: "4c452423-fd2c-404c-9f71-395d85a8b21e",
          title: "Ayakashi Trianlge",
          purchased: 2,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Star Comics",
          price: 5.9,
          rating: 0,
          comment: "",
        },
        {
          id: "8c5de861-c04c-4423-a1b1-b6445eb2b436",
          title: "World finest assassin",
          purchased: 2,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 7,
          rating: 0,
          comment: "",
        },
        {
          id: "c22adbf4-ee0c-4761-a1b1-cfc3cdb276e1",
          title: "Così carina",
          purchased: 3,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Goen",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "39e692dc-2f4d-45fb-b62b-61216d98a6db",
          title: "Boy's Abyss",
          purchased: 7,
          read: 4,
          type: "Manga",
          status: "Reading",
          publisher: "Planet Manga",
          price: 7,
          rating: 0,
          comment: "",
        },
        {
          id: "791b2019-a94b-445b-8f73-cc5eda48065c",
          title: "Neon Genesis Evangelion Collector's Edition",
          purchased: 5,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 14.9,
          rating: 0,
          comment: "",
        },
        {
          id: "67442069-405f-4cbd-9001-2073f69b2416",
          title: "Initial D",
          purchased: 2,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 12,
          rating: 0,
          comment: "Con variant mangayo",
        },
        {
          id: "790c6872-7230-4412-9322-ecf782e52d37",
          title: "Call Of The Night",
          purchased: 8,
          read: 5,
          type: "Manga",
          status: "Reading",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "e79b9a85-3189-48d3-b05d-e83a321c71bb",
          title: "Bakemonogatari - Manga",
          purchased: 3,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Star Comics",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "f5d8d5e9-44da-4c5f-b0d1-7628a21c2fc0",
          title: "Nagatoro",
          purchased: 15,
          read: 15,
          type: "Manga",
          status: "Reading",
          publisher: "JPOP",
          price: 6,
          rating: 0,
          comment: "",
        },
        {
          id: "a9b28206-8e35-4252-b9c0-1ad9edd1f62d",
          title: "Grand blue",
          purchased: 3,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Goen",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "3f8f0c67-387d-4a84-8147-b99be2c305d1",
          title: "Kaguya Sama love is war",
          purchased: 19,
          read: 17,
          type: "Manga",
          status: "Reading",
          publisher: "Star Comics",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "16452df5-8149-4392-8c97-6d2859357455",
          title: "Masamune",
          purchased: 9,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Goen",
          price: 6.95,
          rating: 0,
          comment: "",
        },
        {
          id: "a285d831-8523-4b28-a2d1-b3ed6bcf587f",
          title: "Mieruko chan",
          purchased: 2,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 7.5,
          rating: 0,
          comment: "",
        },
        {
          id: "eda22837-4702-4dfb-8242-9a4ab7cc20ba",
          title: "Couple of cuckoos",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Star Comics",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "4f56c819-8398-47b0-80ad-55982f537bf7",
          title: "Your name",
          purchased: 3,
          read: 3,
          type: "Manga",
          status: "Completed",
          publisher: "JPOP",
          price: 19.5,
          rating: 0,
          comment: "",
        },
        {
          id: "a5d17b3a-8260-4143-951f-0785d1212f03",
          title: "In spectre",
          purchased: 1,
          read: 0,
          type: "Light Novel",
          status: "Reading",
          publisher: "Dokusho",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "997b12e4-c807-4651-8782-ee1e11fe0238",
          title: "Kamiyama",
          purchased: 2,
          read: 1,
          type: "Light Novel",
          status: "Reading",
          publisher: "Dokusho",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "0ba70063-ede6-4ca5-bee4-ab82d0385e15",
          title: "COTE",
          purchased: 1,
          read: 0,
          type: "Light Novel",
          status: "Plan To Read",
          publisher: "Dokusho",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "b8822d60-0668-4be9-9921-1d94eb576d99",
          title: "Monogatari series",
          purchased: 21,
          read: 1,
          type: "Light Novel",
          status: "Plan To Read",
          publisher: "Other",
          price: 300,
          rating: 0,
          comment: "",
        },
        {
          id: "d717df2d-2199-4a3a-99b9-166758080ff0",
          title: "BLAME",
          purchased: 6,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Planet Manga",
          price: 108,
          rating: 0,
          comment: "",
        },
        {
          id: "96e32989-66b9-42f6-bc0d-78e867797c66",
          title: "Character book Miku -JP",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Other",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "cb97863c-d86c-4371-9551-cbb023c49fd8",
          title: "Character book Ichika -JP",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Goen",
          price: 10,
          rating: 0,
          comment: "",
        },
        {
          id: "8d6e23c9-65ae-4506-8860-655bbc0f0c73",
          title: "Character book Itsuki -JP",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Other",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "1e5554a4-13d5-4fdc-9f29-acc55e4c9557",
          title: "World's End Harem Guida",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Other",
          price: 12,
          rating: 0,
          comment: "",
        },
        {
          id: "6c3d20a4-c876-4621-9e7b-484d1c4bb74b",
          title: "Suzume no tojimari",
          purchased: 1,
          read: 0,
          type: "Light Novel",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 16.5,
          rating: 0,
          comment: "",
        },
        {
          id: "87018f20-9ef7-4c1c-9462-1d2940ec1c58",
          title: "Chainsaw Man",
          purchased: 12,
          read: 11,
          type: "Manga",
          status: "Reading",
          publisher: "Planet Manga",
          price: 5.2,
          rating: 0,
          comment: "",
        },
        {
          id: "23a46c80-2afe-417f-894c-2e777b6038aa",
          title: "in gita alla spiaggia per nudisti",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Other",
          price: 14,
          rating: 0,
          comment: "",
        },
        {
          id: "a1712baa-2fae-4ea9-b392-d6ecd3bc9fe2",
          title: "My charms are wasted",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "26ffbdee-bf57-4590-adb0-8696f3504b2e",
          title: "Goodbye, Eri",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "Star Comics",
          price: 5.9,
          rating: 0,
          comment: "",
        },
        {
          id: "6e447634-4935-4769-9788-d3b4a1bb279e",
          title: "DanDaDan",
          purchased: 6,
          read: 5,
          type: "Manga",
          status: "Reading",
          publisher: "JPOP",
          price: 6.5,
          rating: 4,
          comment: "volume 1, 2 e 6 variant",
        },
        {
          id: "9c8a1539-eb36-443a-862e-601a512dabc8",
          title: "Komi can't communicate",
          purchased: 27,
          read: 27,
          type: "Manga",
          status: "Reading",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "eeba8e95-27c0-4d62-beaf-088c54aa5b70",
          title: "Insomniac After school",
          purchased: 1,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "1 variant",
        },
        {
          id: "6f7d5240-700f-4ad1-aafa-9cfef848a710",
          title: "Ice guy and his cool female",
          purchased: 4,
          read: 0,
          type: "Manga",
          status: "Plan To Read",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
        {
          id: "73115db5-d8d5-4b1b-b1d4-928dca4250d2",
          title: "My dress up darling ",
          purchased: 10,
          read: 8,
          type: "Manga",
          status: "Reading",
          publisher: "JPOP",
          price: 6.5,
          rating: 0,
          comment: "",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          backgroundColor: theme.colors.background,
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
          <Text h2 style={{ color: theme.colors.primary }}>
            Caricamento
          </Text>
          <LinearProgress
            color={theme.colors.secondary}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: theme.colors.background }}
      data={libri}
      renderItem={({ item: libro, index }) => (
        <CardLibro libro={libro} key={libro.id} />
      )}
      numColumns={2}
    ></FlatList>
  );
};

const CardLibro = ({ libro }: { libro: Libro }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
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
  return (
    <View>
      <Pressable
        onLongPress={() => setDeleteModalVisible(true)}
        onPressIn={fadeIn}
        onPressOut={fadeOut}
      >
        <Card containerStyle={{ width: 170 }}>
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
              onPress={() => setModalVisible(true)}
              buttonStyle={styles.altroButton}
              titleStyle={{ color: theme.colors.background }}
            >
              Altro
            </Button>
          </Animated.View>
        </Card>
        <Dialog
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={{ backgroundColor: theme.colors.background }}
        >
          <Dialog.Title title={libro.title} titleStyle={{ color: "white" }} />
          <Text>Comprati: {libro.purchased}</Text>
          <Text>Letti: {libro.read}</Text>
          <Text>Tipo: {libro.type}</Text>
          <Text>Status: {libro.status}</Text>
          <Text>Editore: {libro.publisher}</Text>
          <Text>Prezzo: {libro.price}€</Text>
          <Text>Valutazione: {libro.rating}</Text>
          <Dialog.Actions>
            <Dialog.Button title="Modifica" />
          </Dialog.Actions>
        </Dialog>

        <Dialog
          isVisible={deleteModalVisible}
          onBackdropPress={() => setDeleteModalVisible(false)}
          style={{ backgroundColor: theme.colors.background }}
        >
          <Dialog.Title
            title={"ATTENZIONE!!!!!!!!!!!"}
            titleStyle={{ color: "white" }}
          />
          <Text>Comprati: {libro.purchased}</Text>
          <Text>Letti: {libro.read}</Text>
          <Text>Tipo: {libro.type}</Text>
          <Text>Status: {libro.status}</Text>
          <Text>Editore: {libro.publisher}</Text>
          <Text>Prezzo: {libro.price}€</Text>
          <Text>Valutazione: {libro.rating}</Text>
          <Dialog.Actions>
            <Dialog.Button title="elimina" titleStyle={{ color: "red" }} />
          </Dialog.Actions>
        </Dialog>
      </Pressable>
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
