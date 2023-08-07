"use client";

import { createContext, use } from "react";

import { useHistory as useHistoryPrimitive } from "@/hooks/use-history";

const HistoryContext = createContext<{
  setHistory: (history: any[]) => void;
  history: any[];
}>({ history: [], setHistory: () => {} });

export const HistoryProvider: React.FC<
  {
    intialValue?: any[];
  } & Omit<React.ProviderProps<typeof HistoryContext>, "value">
> = ({ intialValue = [], ...props }) => {
  const historyPayload = useHistoryPrimitive(intialValue);
  return <HistoryContext.Provider value={historyPayload} {...props} />;
};

export function useHistory<T, Fn extends Callback<T> = Callback<T>>() {
  return use<{ history: T[]; setHistory: Fn }>(HistoryContext as any);
}

type Callback<T> = React.Dispatch<React.SetStateAction<T[]>>;
