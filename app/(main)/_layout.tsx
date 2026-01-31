
import React from 'react'
import { Stack } from 'expo-router'
const mainLayout = () => {
  return (
   <Stack>
    <Stack.Screen name = "forallveichel" options={{headerShown:false}}/>
   </Stack>
  )
}

export default mainLayout