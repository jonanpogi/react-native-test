import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Constants from "expo-constants";
import { setContext } from "@apollo/client/link/context";
import { clerk } from "@clerk/clerk-expo/dist/singleton";

const httpLink = createHttpLink({
  uri: Constants?.expoConfig?.extra?.APOLLO_CLIENT_URI,
});

const authLink = setContext(async () => {
  const token = await clerk?.session?.getToken();

  return {
    headers: { authorization: token ? `Bearer ${token}` : "" },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
