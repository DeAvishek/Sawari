import { useState } from "react";
import { SearchApi } from "../api/search.api";
import { suggestion } from "../types/suggestion.types";
type prop = {
    location:string,
    type: "source" | "destination";
}
export function getSuggestion() {
    const [loading, setloading] = useState<boolean>(false)
    const [suggestionForSource, setsuggestionForSource] = useState<suggestion[]>([])
    const [suggestionForDest, setsuggestionForDest] = useState<suggestion[]>([])
    async function useSuggestion({location,type}:prop) {
        try {
            setloading(true)
            console.log("called suggestion for source") //todo to remove
            const response = await SearchApi.getSuggestions(location)
            if (type === "source") {
                setsuggestionForSource(response.data)
            } else {
                setsuggestionForDest(response.data)
            }
        } catch (error: unknown) {
            console.log("Error during getting suggestion for source", error);
        } finally {
            setloading(false)
        }
    }
    return {
        useSuggestion,
        loading,
        suggestionForSource,
        setsuggestionForSource,
        suggestionForDest,
        setsuggestionForDest

    }
}