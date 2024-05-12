import { View, StyleSheet, Alert } from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { LoadingAnimation } from "../utils/assets";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      firstName
      lastName
    }
  }
`;

const Initial = () => {
  const lottieViewRef = useRef<LottieView | null>(null);
  const navigation = useNavigation();
  const { userId } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    errorPolicy: "all",
    skip: !userId,
  });

  const handleAnimationFinish = async () => {
    if (loading) {
      return lottieViewRef.current?.play();
    }

    if (error) {
      if (error?.graphQLErrors[0]?.extensions?.code === "RESOURCE_NOT_FOUND") {
        return navigation.navigate("CreateProfile");
      }

      return Alert.alert("Oops!", error?.message || "Something went wrong", [
        { text: "GO BACK" },
        { text: "RETRY", onPress: () => lottieViewRef.current?.play() },
      ]);
    }

    if (data && data?.getUserByClerkId?._id) {
      return navigation.navigate("Dashboard");
    }

    return lottieViewRef.current?.play();
  };

  return (
    <AppSafeAreaView>
      <View style={styles.container}>
        <LottieView
          ref={lottieViewRef}
          speed={4}
          autoPlay
          loop={false}
          source={LoadingAnimation}
          style={{ width: "60%", aspectRatio: 1 }}
          onAnimationFinish={handleAnimationFinish}
        />
      </View>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Initial;
