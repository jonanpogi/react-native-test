import { useState } from "react";
import AppKeyboardAvoidingView from "../components/AppKeyboardAvoidingView";
import AppSafeAreaView from "../components/AppSafeAreaView";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppBackButton from "../components/AppBackButton";
import { useSignUp } from "@clerk/clerk-expo";
import AppLoading from "../components/AppLoading";
import { OtpInput } from "react-native-otp-entry";

const SignUp = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // prepare verification email.
  const prepareEmailAddressVerification = async () => {
    if (!isLoaded) {
      return;
    }

    // send the email.
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  };

  const handleSignUp = async () => {
    if (!isLoaded) {
      return;
    }

    if (emailAddress === "" && password === "" && verifyPassword === "") {
      return Alert.alert("Oops", "Please fill in all fields");
    }

    if (emailAddress === "") {
      return Alert.alert("Oops", "Please enter your email address");
    }

    if (password === "") {
      return Alert.alert("Oops", "Please enter your password");
    }

    if (verifyPassword === "") {
      return Alert.alert("Oops", "Please verify your password");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      return Alert.alert("Oops", "Please enter a valid email address");
    }

    if (password.length < 8) {
      return Alert.alert("Oops", "Password must be at least 8 characters");
    }

    if (password !== verifyPassword) {
      return Alert.alert("Oops", "Passwords do not match");
    }

    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // prepare the email verification.
      await prepareEmailAddressVerification();

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (error: any) {
      return Alert.alert(
        "Oops!",
        error?.errors[0]?.longMessage || "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    await prepareEmailAddressVerification();
  };

  const handleVerifyCode = async () => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (error: any) {
      return Alert.alert(
        "Oops!",
        error?.errors[0].longMessage ||
          "Unable to verify email. Please try again."
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

            <Text style={styles.title}>Sign Up</Text>

            {!pendingVerification ? (
              <>
                <Text style={styles.subTitle}>
                  To continue, enter your email and set your password
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

                  <Text style={styles.label}>Verify Password:</Text>

                  <TextInput
                    autoCapitalize="none"
                    value={verifyPassword}
                    onChangeText={(text) => setVerifyPassword(text)}
                    style={styles.textInput}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                  <Text style={styles.buttonText}>SAVE CHANGES</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.subTitle}>
                  Please enter the one-time code sent to your email
                </Text>

                <View style={styles.content}>
                  <OtpInput
                    numberOfDigits={6}
                    onTextChange={(text) => setCode(text)}
                    autoFocus
                    focusColor={"#007AFF"}
                  />

                  <TouchableOpacity onPress={handleResendCode}>
                    <Text style={styles.link}>Resend OTP</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleVerifyCode}
                >
                  <Text style={styles.buttonText}> VERIFY CODE</Text>
                </TouchableOpacity>
              </>
            )}
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
  link: {
    color: "#007AFF",
    marginVertical: 16,
  },
});

export default SignUp;
