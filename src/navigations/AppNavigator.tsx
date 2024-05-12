import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardNavigator from "./DashboardNavigator";
import Initial from "../screens/Initial";
import CreateProfile from "../screens/CreateProfile";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

type AppStackParamList = {
  Initial: undefined;
  CreateProfile: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => undefined }}>
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Dashboard" component={DashboardNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
