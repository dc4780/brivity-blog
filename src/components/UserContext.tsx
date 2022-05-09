import { useState, createContext } from 'react';

export type AuthorizedUser = {
  displayName: string;
  id: null | number;
  email: string;
  token: string;
}

type UserContextType = {
  user: AuthorizedUser | null,
  setUser: React.Dispatch<React.SetStateAction<AuthorizedUser | null>>
}
type UserContextProviderProps = {
  children: React.ReactNode
}

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthorizedUser | null>(null)
  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}
