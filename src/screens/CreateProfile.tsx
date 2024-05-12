import AppSafeAreaView from "../components/AppSafeAreaView";
import { View, Text, StyleSheet } from "react-native";

const CreateProfile = () => {
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <Text>Create Profile</Text>
      </View>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateProfile;
