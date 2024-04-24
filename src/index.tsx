import { useEffect, useState } from "react";
import AppSafeAreaView from "./components/AppSafeAreaView";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppItem from "./components/AppItem";

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

const Main = () => {
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

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Products</Text>
          <Button
            title={`SORT BY CATEGORY ${productOrder === "asc" ? "↓" : "↑"}`}
            onPress={() => {
              setProductOrder(productOrder === "asc" ? "desc" : "asc");
              onSortByCategory();
            }}
          />
        </View>

        {products.length > 1 && (
          <FlatList
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(item) => item.id.toString()}
            data={productsCopy}
            renderItem={({ item }) => <AppItem {...item} />}
            onEndReachedThreshold={0}
            onEndReached={onEndReached}
          />
        )}

        <ActivityIndicator animating={loading} size="large" color="#333333" />
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
  },
  modalOuterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalInnerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
  },
});

export default Main;
