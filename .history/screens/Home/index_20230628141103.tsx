import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";
import { Text, useThemeColor } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { HomeParamList } from "../../types";
import data from "../../constants/us-states.json";

interface Props {
  navigation: StackNavigationProp<HomeParamList, "HomeScreen">;
}

export default function Home({ navigation }: Props) {
  return (
    <Screen scroll>
      <Text style={styles.title}>POPULAR</Text>
      <Text style={styles.text}>This is a home page</Text>
      <IncidentMap data={data} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 19,
  },
  text: {
    color: Colors.dark.text,
  },
});
