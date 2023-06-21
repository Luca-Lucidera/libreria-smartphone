import { useTheme, Text, LinearProgress } from "@rneui/themed";
import { View } from "react-native";

export const Loading = () => {
  const { theme } = useTheme();
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
};
