import { Stack } from "expo-router"
const workingLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="metroticket" options={{headerShown:false}}/>
    </Stack>
  )
}

export default workingLayout