import { View, Text, StyleSheet } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";

const Scanner = () => {
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <Text>Scanner</Text>
      </View>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 16,
  },
});

export default Scanner;
