import { useGetMeQuery } from "@/store/features/auth/auth.api";
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type StateContextType = {
  user: any[];
  setUser: Dispatch<SetStateAction<any[]>>;
};

export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any[]>([]);
  const { data } = useGetMeQuery(undefined);
  useEffect(() => {
    // You can fetch and set the user state here if needed
    setUser(data || []);
  }, [data]);
  return (
    <StateContext.Provider value={{ user, setUser }}>
      {children}
    </StateContext.Provider>
  );
};
