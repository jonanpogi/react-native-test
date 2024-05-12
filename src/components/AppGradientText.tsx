import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextProps, View } from "react-native";

type Props = {
  colors: string[];
  text: string;
} & TextProps;

const AppGradientText = ({ colors, text, ...otherProps }: Props) => {
  return (
    <MaskedView
      style={{ height: 50, flexDirection: "row", backgroundColor: "transparent"}}
      maskElement={
        <View
          style={{
            backgroundColor: "transparent",
            height: 50,
          }}
        >
          <Text {...otherProps} style={[otherProps.style, { opacity: 1 }]}>
            {text}
          </Text>
        </View>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
};

export default AppGradientText;
