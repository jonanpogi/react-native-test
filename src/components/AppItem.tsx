import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Product } from "..";
import Collapsible from "react-native-collapsible";
import { useState } from "react";

const AppItem = ({
  id,
  description,
  rating,
  title,
  price,
  category,
  image,
}: Product) => {
  const [isCollapsed, setIsCollpsed] = useState(true);

  return (
    <TouchableWithoutFeedback onPress={() => setIsCollpsed(!isCollapsed)}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {title}
            </Text>
            <Text style={styles.price}>{"$" + price}</Text>
          </View>
        </View>

        <Collapsible collapsed={isCollapsed}>
          <View style={styles.textContainer}>
            <View style={styles.lineBreak} />
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.description}>{id}</Text>

            <View style={styles.lineBreak} />
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.lineBreak} />
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.description}>{rating.rate}</Text>
          </View>
        </Collapsible>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 4, // Increase the shadow offset for a more intense effect
    },
    shadowOpacity: 0.5, // Increase the shadow opacity for a more intense effect
    shadowRadius: 8, // Increase the shadow radius for a more intense effect
    elevation: 10, // Add elevation for shadow effect
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 6,
  },
  textContainer: {
    flex: 1,
    marginRight: 6,
  },
  category: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#333333",
  },
  label: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "700",
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "300",
    fontStyle: "italic",
    marginBottom: 16,
  },
  lineBreak: {
    height: 1,
    width: "100%",
    backgroundColor: "#333333",
    marginVertical: 8,
  },
});

export default AppItem;
