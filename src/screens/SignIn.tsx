import { useState } from "react";
import AppKeyboardAvoidingView from "../components/AppKeyboardAvoidingView";
import AppSafeAreaView from "../components/AppSafeAreaView";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSignIn } from "@clerk/clerk-expo";
import AppLoading from "../components/AppLoading";

const SignIn = () => {
  const navigation = useNavigation();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();

  const goToSignUp = () => navigation.navigate("SignUp");

  const goToForgotPassword = () => navigation.navigate("ForgotPassword");

  const handleSignIn = async () => {
    if (!isLoaded) {
      return;
    }

    if (emailAddress === "" && password === "") {
      return Alert.alert("Oops", "Please fill in all fields");
    }

    if (emailAddress === "") {
      return Alert.alert("Oops", "Please enter your email address");
    }

    if (password === "") {
      return Alert.alert("Oops", "Please enter your password");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      return Alert.alert("Oops", "Please enter a valid email address");
    }

    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      return await setActive({ session: completeSignIn.createdSessionId });
    } catch (error: any) {
      return Alert.alert(
        "Oops!",
        error?.errors[0]?.longMessage || "Unable to sign in. Please try again."
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
            <Text style={styles.title}>Sign In</Text>

            <Text style={styles.subTitle}>
              Please Enter Your Email & Password
            </Text>

            <View style={styles.content}>
              <Text style={styles.label}>Email Addres:</Text>

              <TextInput
                autoFocus
                autoCapitalize="none"
                placeholder="your@email.com"
                value={emailAddress}
                onChangeText={(text) => setEmailAddress(text)}
                style={styles.textInput}
              />

              <Text style={styles.label}>Password:</Text>

              <TextInput
                autoCapitalize="none"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
                secureTextEntry
              />

              <View style={styles.supportingText}>
                <Text>No account yet?</Text>
                <TouchableOpacity onPress={goToSignUp}>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.supportingText}>
                <TouchableOpacity onPress={goToForgotPassword}>
                  <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>SIGN IN</Text>
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
  supportingText: {
    display: "flex",
    alignItems: "center",
    columnGap: 6,
    flexDirection: "row",
    marginVertical: 16,
  },
  link: {
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 22,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
    marginVertical: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default SignIn;
