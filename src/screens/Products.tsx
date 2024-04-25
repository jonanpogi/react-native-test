import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
import AppItem from "../components/AppItem";
import { useAuth } from "@clerk/clerk-expo";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const DEFAULT_LIMIT = 5;

const Products = () => {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsCopy, setProductsCopy] = useState<Product[]>([]);
  const [productOrder, setProductOrder] = useState<"asc" | "desc">("asc");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const endpoint = `https://fakestoreapi.com/products`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = (await response.json()) as Product[];

      setProducts(data);
      setProductsCopy(data.filter((_, index) => index < DEFAULT_LIMIT));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch products";

      Alert.alert("Oops!", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onEndReached = () => {
    setLoading(true);

    setTimeout(() => {
      const currentLength = productsCopy.length;
      const nextLength = currentLength + DEFAULT_LIMIT;
      const nextProducts = products.slice(currentLength, nextLength);

      setProductsCopy([...productsCopy, ...nextProducts]);

      setLoading(false);
    }, 2000);
  };

  const onSortByCategory = () => {
    const sortedProducts = productsCopy.sort((a, b) => {
      // Convert category to lowercase to avoid case-related issues
      const categoryA = a.category.toLowerCase();
      const categoryB = b.category.toLowerCase();

      if (productOrder === "asc") {
        // Ascending order
        if (categoryA < categoryB) {
          return -1;
        } else if (categoryA > categoryB) {
          return 1;
        } else {
          return 0;
        }
      } else if (productOrder === "desc") {
        // Descending order
        if (categoryA > categoryB) {
          return -1;
        } else if (categoryA < categoryB) {
          return 1;
        } else {
          return 0;
        }
      } else {
        // Fallback to no sorting
        return 0;
      }
    });

    setProductsCopy([...sortedProducts]);
  };

  const handleSortByCategory = () => {
    setProductOrder(productOrder === "asc" ? "desc" : "asc");
    onSortByCategory();
  };

  const handleSignOut = async () => await signOut();

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Products</Text>
          <TouchableWithoutFeedback onPress={handleSortByCategory}>
            <Text style={styles.link}>{`SORT BY CATEGORY ${
              productOrder === "asc" ? "↓" : "↑"
            }`}</Text>
          </TouchableWithoutFeedback>
        </View>

        {products.length === 0 && (
          <ActivityIndicator animating={loading} size="large" color="#333333" />
        )}

        {products.length > 1 && (
          <FlatList
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(item) => item.id.toString()}
            data={productsCopy}
            renderItem={({ item }) => <AppItem {...item} />}
            onEndReachedThreshold={0}
            onEndReached={onEndReached}
            ListFooterComponent={
              <ActivityIndicator
                animating={loading}
                size="large"
                color="#333333"
              />
            }
          />
        )}

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
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  contentContainer: {
    flexGrow: 1,
    display: "flex",
    rowGap: 16,
    padding: 16,
    backgroundColor: "#F6F6F6",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 22,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  link: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Products;
