import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
import AppIconButton from "../components/AppIconButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AppItem from "../components/AppItem";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      firstName
      lastName
    }
  }
`;

const Home = () => {
  const { userId } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    errorPolicy: "all",
    skip: !userId,
  });

  useEffect(() => {
    if (error) {
      return Alert.alert("Oops!", error.message || "Something went wrong!");
    }
  }, [error]);

  const fullName = loading
    ? "Loading..."
    : data?.getUser?.firstName + " " + data?.getUser?.lastName;

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <Text style={styles.label}>Hello there!,</Text>
        <Text style={styles.fullName}>{fullName}</Text>
        <View style={styles.balanceContainer}>
          <View>
            <Text style={styles.balanceInfoText}>Available Balance</Text>
            <Text style={styles.balanceAmount}>{`₱ 100.00`}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>+ ADD FUND</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Services</Text>
        <ScrollView horizontal style={styles.servicesScrollView}>
          <AppIconButton
            icon={
              <FontAwesome6 name="money-bill-wave" size={24} color="#FFFFFF" />
            }
            label="Pay Retailer"
          />
          <AppIconButton
            icon={<FontAwesome name="bank" size={24} color="#FFFFFF" />}
            label="Transfer to Bank"
          />
        </ScrollView>
        <Text style={styles.label}>Transactions</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppItem transaction={"cash_in"} amount={100} date={"May 12, 2024"} />

          <Text style={styles.link} onPress={() => {}}>
            View all transactions...
          </Text>
        </ScrollView>
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
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 8,
  },
  fullName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#66A3FF",
    marginBottom: 16,
  },
  balanceContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 22,
    backgroundColor: "#007AFF",
    height: 120,
    shadowOffset: {
      width: 0,
      height: 4, // Increase the shadow offset for a more intense effect
    },
    shadowOpacity: 0.5, // Increase the shadow opacity for a more intense effect
    shadowRadius: 8, // Increase the shadow radius for a more intense effect
    elevation: 10, // Add elevation for shadow effect
    marginBottom: 16,
  },
  balanceInfoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F6F6F6",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 22,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  servicesScrollView: {
    flexGrow: 0,
    marginVertical: 16,
  },
  link: {
    fontSize: 16,
    fontWeight: "700",
    color: "#66A3FF",
    alignSelf: "center",
    margin: 8,
  },
});

export default Home;
