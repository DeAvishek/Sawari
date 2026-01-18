import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="verification" options={{headerShown:false}}/>
      <Stack.Screen name="locationallow" options={{headerShown:false}}/>
      <Stack.Screen name="home" options={{headerShown:false}}/>
    </Stack>
  );
}