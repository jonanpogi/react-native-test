import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Constants from "expo-constants";

type Props = {
  children: React.ReactNode;
};

const AppSafeAreaView = ({ children }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
});

export default AppSafeAreaView;
