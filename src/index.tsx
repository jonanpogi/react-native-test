import AppNavigator from "./navigations/AppNavigator";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import tokenCache from "./utils/tokenCache";
import AuthNavigator from "./navigations/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./utils/apolloClient";
import { PaperProvider } from "react-native-paper";
import theme from "./utils/theme";

const Main = () => {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
    >
      <ApolloProvider client={apolloClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <SignedIn>
              <AppNavigator />
            </SignedIn>
            <SignedOut>
              <AuthNavigator />
            </SignedOut>
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </ClerkProvider>
  );
};

export default Main;
