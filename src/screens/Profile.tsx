import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
import { useAuth } from "@clerk/clerk-expo";

const Profile = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => await signOut();

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 22,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#FF6666",
    fontWeight: "bold",
  },
});

export default Profile;
