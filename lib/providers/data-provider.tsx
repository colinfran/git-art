"use client"
import React, { createContext, FC, ReactNode, useContext, useState } from "react"

type ContextProps = {
  refresh: boolean
  setRefresh: (val: boolean) => void
}

const defaultContextValue: ContextProps = {
  refresh: false,
  setRefresh: () => {},
}

const DataContext = createContext<ContextProps>(defaultContextValue)

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [refresh, setRefresh] = useState<boolean>(false)

  return <DataContext.Provider value={{ refresh, setRefresh }}>{children}</DataContext.Provider>
}

export const useData = (): ContextProps => {
  return useContext(DataContext)
}
