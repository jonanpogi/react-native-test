import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, AvatarImageProps } from "react-native-paper";
import useAppTheme from "../hooks/useAppTheme";

type Props = {
  withIconEdit?: boolean;
  onPress?: () => void;
} & AvatarImageProps;

const AppAvatarImage = ({
  size,
  source,
  withIconEdit = false,
  onPress,
}: Props) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles(size).container}>
        <Avatar.Image size={size} source={source} style={styles().avatar} />
        {withIconEdit && (
          <View style={styles().iconContainer}>
            <Ionicons name="pencil" size={18} color={theme.colors.blue.light} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = (size?: number) =>
  StyleSheet.create({
    container: {
      borderRadius: 100,
      borderWidth: 6,
      borderColor: "white",
      position: "relative",
      shadowOffset: {
        width: 0,
        height: 4, // Increase the shadow offset for a more intense effect
      },
      shadowOpacity: 0.5, // Increase the shadow opacity for a more intense effect
      shadowRadius: 8, // Increase the shadow radius for a more intense effect
      elevation: 10, // Add elevation for shadow effect
      width: size ? size + 10 : 80,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    avatar: {
      // borderWidth: 1,
      // borderColor: "black",
    },
    iconContainer: {
      backgroundColor: "white",
      alignSelf: "baseline",
      padding: 6,
      borderRadius: 50,
      position: "absolute",
      bottom: -5,
      right: -10,
    },
  });

export default AppAvatarImage;
