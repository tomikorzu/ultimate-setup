import { profileContext } from "../providers/ProfileContextProvider";
import { useContext } from "react";
export default function useProfile() {
    return useContext(profileContext)
}