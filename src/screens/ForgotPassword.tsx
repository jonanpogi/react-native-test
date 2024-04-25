import { useState } from "react";
import AppBackButton from "../components/AppBackButton";
import AppKeyboardAvoidingView from "../components/AppKeyboardAvoidingView";
import AppSafeAreaView from "../components/AppSafeAreaView";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import AppLoading from "../components/AppLoading";
import { OtpInput } from "react-native-otp-entry";

const ForgotPassword = () => {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const { signIn, isLoaded, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const sendEmailVerificationCode = async () => {
    if (!isLoaded) return;

    if (emailAddress === "") {
      return Alert.alert("Oops", "Please enter your email address");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      return Alert.alert("Oops", "Please enter a valid email address");
    }

    setLoading(true);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      setPendingVerification(true);
    } catch (error: any) {
      return Alert.alert(
        "Oops!",
        error?.errors[0]?.longMessage ||
          "Unable to send email verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    await sendEmailVerificationCode();
  };

  const verifyEmailVerificationCode = async () => {
    if (!isLoaded) return;

    if (code === "" && password === "" && verifyPassword === "") {
      return Alert.alert("Oops", "Please fill in all fields");
    }

    if (code === "") {
      return Alert.alert("Oops", "Please enter the verification code");
    }

    if (password === "") {
      return Alert.alert("Oops", "Please enter your password");
    }

    if (password.length < 8) {
      return Alert.alert("Oops", "Password must be at least 8 characters");
    }

    if (verifyPassword === "") {
      return Alert.alert("Oops", "Please verify your password");
    }

    if (password !== verifyPassword) {
      return Alert.alert("Oops", "Passwords do not match");
    }

    setLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        return await setActive({ session: result.createdSessionId });
      } else {
        return Alert.alert("Oops", "Unable to verify email verification code.");
      }
    } catch (error: any) {
      return Alert.alert(
        "Oops!",
        error?.errors[0]?.longMessage ||
          "Unable to verify email verification code."
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

            <Text style={styles.title}>Forgot Password</Text>

            {!pendingVerification ? (
              <>
                <Text style={styles.subTitle}>
                  Please enter your email address to reset your password
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
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={sendEmailVerificationCode}
                >
                  <Text style={styles.buttonText}>SUBMIT EMAIL</Text>
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

                  <Text style={styles.subTitle}>
                    And enter your desired password
                  </Text>

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

                <TouchableOpacity
                  style={styles.button}
                  onPress={verifyEmailVerificationCode}
                >
                  <Text style={styles.buttonText}> SAVE CHANGES</Text>
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

export default ForgotPassword;
