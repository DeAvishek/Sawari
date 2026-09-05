import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      
      <Stack.Screen name="index" options={{headerShown:false}}/>
      <Stack.Screen name="verification" options={{headerShown:false}}/>
      <Stack.Screen name="locationallow" options={{headerShown:false}}/>
      <Stack.Screen name="home" options={{headerShown:false}}/>
      <Stack.Screen name="autobooking" options={{headerShown:false}}/>
      <Stack.Screen name="(working)" options={{headerShown:false}}/>
      <Stack.Screen name="tripbooking" options={{headerShown:false}}/>
      <Stack.Screen name="signup" options={{headerShown:false}} />
      <Stack.Screen name="haha" options={{headerShown:false}}/>
      <Stack.Screen name="trippage" options={{headerShown:false}}/>
    </Stack>
  );
}