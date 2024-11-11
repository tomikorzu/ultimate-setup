import { useContext, useState } from "react";

export const profileContext = useContext(null);

export default function ProfileContextProvider({ children }) {
  const [profile, setProfile] = useState(undefined);

  const loginWithUsername = async (username) => {
    const userResponse = await fetch("/users.json");
    const userData = await userResponse.json();

    const matchingUser = userData.find((user) => user.username === username);

    if (matchingUser) {
      setProfile(matchingUser);
    }
  };

  return (
    <profileContext.provider value={{ profile, loginWithUsername }}>
      {children}
    </profileContext.provider>
  );
}
