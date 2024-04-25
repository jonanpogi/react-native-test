import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

type AppStackParamList = {
  Products: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => undefined }}>
      <Stack.Screen name="Products" component={Products} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
