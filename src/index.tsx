import AppNavigator from "./navigations/AppNavigator";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import tokenCache from "./utils/tokenCache";
import AuthNavigator from "./navigations/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Main = () => {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
    >
      <NavigationContainer>
        <SignedIn>
          <AppNavigator />
        </SignedIn>
        <SignedOut>
          <AuthNavigator />
        </SignedOut>
      </NavigationContainer>
    </ClerkProvider>
  );
};

export default Main;
