
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type LocationType= {
    latitude:number,
    longitude:number
}
type Action={
    setLocationData:(latitude:number,longitude:number)=>void
    clearLocationData:()=>void
}

const LocationDataStore = create<LocationType & Action>()(
  persist(
    (set) => ({
      latitude: 0,
      longitude: 0,

      setLocationData: (latitude, longitude) =>
        set({ latitude, longitude }),

      clearLocationData: () =>
        set({ latitude: 0, longitude: 0 }),
    }),
    {
      name: "Location_Data_store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default LocationDataStore