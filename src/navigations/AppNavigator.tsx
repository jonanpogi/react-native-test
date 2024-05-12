import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardNavigator from "./DashboardNavigator";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

type AppStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => undefined }}>
      <Stack.Screen name="Dashboard" component={DashboardNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
