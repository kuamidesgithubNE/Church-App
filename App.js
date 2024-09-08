import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_500Medium,
} from "@expo-google-fonts/nunito";
import AppNavigator from "./src/navigations/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_500Medium,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}
