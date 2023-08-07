"use client";

import { createContext, use } from "react";

import { useHistory as useHistoryPrimitive } from "@/hooks/use-history";

const HistoryContext = createContext<{
  setHistory: (history: any[]) => void;
  history: any[];
}>({ history: [], setHistory: () => {} });

export const HistoryProvider: React.FC<
  {
    user: { id: number } | null;
    intialValue?: any[];
  } & Omit<React.ProviderProps<typeof HistoryContext>, "value">
> = ({ user, intialValue = [], ...props }) => {
  const [history, setHistory] = useHistoryPrimitive(user?.id ?? 0, intialValue);
  return <HistoryContext.Provider value={{ history, setHistory }} {...props} />;
};

export function useHistory<T, Fn extends Callback<T> = Callback<T>>() {
  return use<{ history: T[]; setHistory: Fn }>(HistoryContext as any);
}

type Callback<T> = React.Dispatch<React.SetStateAction<T[]>>;
