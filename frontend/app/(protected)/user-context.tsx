"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { UserMeResponse } from "@/app/schemas/user/userMe";

const UserContext = createContext<UserMeResponse | null>(null);

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserMeResponse;
}) {
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={currentUser} key={user.data ? user.data.id : "guest"}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
