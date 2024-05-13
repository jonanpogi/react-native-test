import { useTheme } from "react-native-paper";
import { AppTheme } from "../utils/theme";

const useAppTheme = () => {
  return useTheme<AppTheme>();
};

export default useAppTheme;
