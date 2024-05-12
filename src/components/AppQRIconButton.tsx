import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  focused: boolean;
  color: string;
  size: number;
};

const AppQRIconButton = ({ focused, color, size }: Props) => {
  return (
    <View style={styles(color).container}>
      <Ionicons
        color={color}
        size={size}
        name={focused ? "qr-code" : "qr-code-outline"}
      />
    </View>
  );
};

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      marginBottom: 16,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: color,
      backgroundColor: "white",
      position: "absolute",
      top: "-50%",
      shadowOffset: {
        width: 0,
        height: 4, // Increase the shadow offset for a more intense effect
      },
      shadowOpacity: 0.5, // Increase the shadow opacity for a more intense effect
      shadowRadius: 8, // Increase the shadow radius for a more intense effect
      elevation: 10, // Add elevation for shadow effect
    },
  });

export default AppQRIconButton;
