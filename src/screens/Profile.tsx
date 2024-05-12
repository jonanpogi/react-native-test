import { View, Text, StyleSheet } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";

const Profile = () => {
  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <Text>Profile</Text>
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

export default Profile;
