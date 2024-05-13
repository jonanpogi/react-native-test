import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from "react-native";
import AppSafeAreaView from "../components/AppSafeAreaView";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { gql, useMutation, useQuery } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import AppLoading from "../components/AppLoading";
import AppAvatarImage from "../components/AppAvatarImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useAppTheme from "../hooks/useAppTheme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import apolloClient from "../utils/apolloClient";

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      firstName
      lastName
      imageUrl
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      _id
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      _id
    }
  }
`;

const Profile = () => {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const bottomModalRef = useRef<RBSheetRef | null>(null);
  const {
    data,
    loading: userLoading,
    error,
  } = useQuery(GET_USER, { errorPolicy: "all" });
  const [updateUser] = useMutation(UPDATE_USER, { errorPolicy: "all" });
  const [deleteUser] = useMutation(DELETE_USER, { errorPolicy: "all" });

  useEffect(() => {
    if (error) {
      return Alert.alert("Oops!", error.message || "Something went wrong!");
    }
  }, [error]);

  const handleViewProfileImage = () => {
    navigation.navigate("ViewProfileImage", {
      uri: user?.imageUrl || data?.getUser?.imageUrl || "",
    });
    bottomModalRef.current?.close();
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      bottomModalRef.current?.close();
      setLoading(true);

      if (result.assets.length === 0) {
        throw new Error("Unable to fetch image.");
      }

      const response = await user?.setProfileImage({
        file: {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType as string,
          name: result.assets[0].uri.split("/").pop() as string,
        } as unknown as File,
      });

      if (!response) {
        throw new Error("Unable to upload image.");
      }

      const imageUrl = response.publicUrl;

      const { data, errors } = await updateUser({
        variables: { input: { imageUrl } },
        errorPolicy: "all",
      });

      if (errors || !data?.updateUser?._id) {
        throw new Error("Unable to update your profile.");
      }

      return;
    } catch (error: any) {
      return Alert.alert("Oops!", error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadProfileImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    switch (status) {
      case ImagePicker.PermissionStatus.DENIED: {
        Alert.alert(
          "Permission required",
          "You need to enable permission to access your image library.",
          [
            {
              text: "CANCEL",
            },
            {
              text: "GO TO SETTINGS",
              onPress: () => {
                Platform.OS === "ios"
                  ? Linking.openURL("app-settings:")
                  : Linking.openSettings();
              },
            },
          ]
        );
        break;
      }

      case ImagePicker.PermissionStatus.UNDETERMINED: {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status === ImagePicker.PermissionStatus.DENIED) return;

        await pickImage();
        break;
      }

      case ImagePicker.PermissionStatus.GRANTED: {
        await pickImage();
        break;
      }

      default: {
        break;
      }
    }

    return;
  };

  const handleDeleteAccount = async () => {
    Alert.alert("Are you sure?", "You are about to delete your account", [
      {
        text: "CANCEL",
      },
      {
        text: "DELETE",
        style: "destructive",
        onPress: async () => {
          try {
            bottomModalRef.current?.close();
            setLoading(true);

            const { errors } = await deleteUser();

            await apolloClient.clearStore();

            await user?.delete();

            if (errors) {
              Alert.alert("Oops!", "Deletion of your account failed");
            }

            return;
          } catch (error) {
            return Alert.alert("Opps!", "Deletion of your account failed");
          } finally {
            return setLoading(false);
          }
        },
      },
    ]);
  };

  const handleSignOut = async () => await signOut();

  const handleUpdateProfileName = () =>
    navigation.navigate("UpdateProfileName", {
      firstName: data?.getUser?.firstName || "",
      lastName: data?.getUser?.lastName || "",
    });

  const fullName = userLoading
    ? "Loading..."
    : data?.getUser?.firstName + " " + data?.getUser?.lastName;

  return (
    <>
      <AppSafeAreaView>
        <View style={styles.container}>
          <AppAvatarImage
            size={100}
            source={{ uri: user?.imageUrl || data?.getUser?.imageUrl }}
            withIconEdit
            onPress={() => bottomModalRef.current?.open()}
          />

          {!userLoading ? (
            <TouchableOpacity
              style={styles.fullNameContainer}
              onPress={handleUpdateProfileName}
            >
              <Text style={styles.fullName}>{fullName}</Text>
              <Ionicons
                name="pencil"
                size={18}
                color={theme.colors.blue.light}
              />
            </TouchableOpacity>
          ) : (
            <Text>Loading...</Text>
          )}

          <Text>Do you want to</Text>

          <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
            <Text style={styles.buttonText}>DELETE YOUR ACCOUNT</Text>
          </TouchableOpacity>

          <Text>or</Text>

          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </AppSafeAreaView>

      <RBSheet
        draggable
        dragOnContent
        ref={bottomModalRef}
        height={225}
        customStyles={{
          container: {
            backgroundColor: "#F6F6F6",
          },
        }}
      >
        <View style={styles.rbSheetContainer}>
          <TouchableOpacity
            style={styles.appItem}
            onPress={handleViewProfileImage}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="image-outline"
                size={28}
                color={"#FFFFFF"}
              />
            </View>
            <Text style={styles.appItemText}>View Profile Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.appItem}
            onPress={handleUploadProfileImage}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="image-edit-outline"
                size={28}
                color={"#FFFFFF"}
              />
            </View>
            <Text style={styles.appItemText}>Update Profile Image</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <AppLoading visible={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  fullName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#66A3FF",
  },
  fullNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginTop: 32,
    marginBottom: 64,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 22,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#FF6666",
    fontWeight: "bold",
  },
  rbSheetContainer: { flex: 1 },
  iconContainer: {
    backgroundColor: "#66A3FF",
    padding: 8,
    borderRadius: 50,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  appItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    columnGap: 8,
  },
  appItemText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
  },
});

export default Profile;
