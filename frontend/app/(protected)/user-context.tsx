"use client";

import { createContext, useContext } from "react";
import { UserMeResponse } from "@/app/schemas/user/userMe";

const UserContext = createContext<UserMeResponse | null>(null);

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserMeResponse;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
