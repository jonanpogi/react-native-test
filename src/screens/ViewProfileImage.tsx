import { View, Image, StyleSheet } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
import AppBackButton from "../components/AppBackButton";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppStackParamList } from "../navigations/AppNavigator";

const ViewProfileImage = () => {
  const route = useRoute<RouteProp<AppStackParamList, "ViewProfileImage">>();
  const { uri } = route.params;

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <AppBackButton color="white" />
        <Image source={{ uri }} style={{ flex: 1 }} resizeMode="contain" />
      </View>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 16,
    backgroundColor: "black",
  },
});

export default ViewProfileImage;
