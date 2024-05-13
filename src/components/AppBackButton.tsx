import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

type Props = { color?: string };

const AppBackButton = ({ color }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}
    >
      <Ionicons
        name="arrow-back-outline"
        size={32}
        color={color || "#444444"}
      />
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    marginVertical: 16,
  },
};

export default AppBackButton;
