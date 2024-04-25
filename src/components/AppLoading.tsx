import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

type Props = {
  visible: boolean;
};

const AppLoading = ({ visible }: Props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AppLoading;
