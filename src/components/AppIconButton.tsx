import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

type Props = {
  icon: React.ReactNode;
  label: string;
};

const AppIconButton = ({ icon, label }: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "auto",
    padding: 16,
    width: "auto",
  },
  iconContainer: {
    backgroundColor: "#66A3FF",
    padding: 16,
    borderRadius: 50,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
  },
});

export default AppIconButton;
