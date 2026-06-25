"use client"

import { createContext, useContext } from "react"

type EditorContextType = {
  isAdmin: boolean
}

const EditorContext = createContext<EditorContextType>({
  isAdmin: false,
})

export function EditorProvider({
  isAdmin,
  children,
}: {
  isAdmin: boolean
  children: React.ReactNode
}) {
  return (
    <EditorContext.Provider value={{ isAdmin }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  return useContext(EditorContext)
}