import { useState } from "react";
import AppSafeAreaView from "../components/AppSafeAreaView";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import AppLoading from "../components/AppLoading";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AppKeyboardAvoidingView from "../components/AppKeyboardAvoidingView";
import AppBackButton from "../components/AppBackButton";
import { AppStackParamList } from "../navigations/AppNavigator";

type UserUpdateInput = {
  input: {
    clerkId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
  };
};

const UPDATE_USER = gql`
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      _id
    }
  }
`;

const UpdateProfileName = () => {
  const route = useRoute<RouteProp<AppStackParamList, "UpdateProfileName">>();
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [loading, setLoading] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER, { errorPolicy: "all" });

  const handleUpdateUser = async () => {
    setLoading(true);

    const variables: UserUpdateInput = {
      input: {
        firstName,
        lastName,
      },
    };

    try {
      const { errors } = await updateUser({
        variables,
        refetchQueries: ["GetUser"],
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return navigation.goBack();
    } catch (error) {
      return Alert.alert(
        "Oops!",
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppSafeAreaView>
        <AppKeyboardAvoidingView>
          <View style={styles.container}>
            <AppBackButton />

            <Text style={styles.title}>Update Profile Name</Text>

            <Text style={styles.subTitle}>
              Please fill the following fields below to change your full name
            </Text>

            <View style={styles.content}>
              <Text style={styles.label}>First Name:</Text>

              <TextInput
                autoFocus
                placeholder="John"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                style={styles.textInput}
              />

              <Text style={styles.label}>Last Name:</Text>

              <TextInput
                placeholder="Doe"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
              <Text style={styles.buttonText}> SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
        </AppKeyboardAvoidingView>
      </AppSafeAreaView>
      <AppLoading visible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333333",
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 32,
    color: "#333333",
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333333",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#888888",
    borderRadius: 22,
    padding: 16,
    marginVertical: 16,
    height: 52,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 22,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    marginVertical: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default UpdateProfileName;
