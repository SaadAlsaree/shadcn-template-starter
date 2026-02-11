"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"

const defaultTheme = "system"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  const nextTheme = useNextTheme()
  
  return {
    theme: nextTheme.theme,
    setTheme: nextTheme.setTheme,
    defaultTheme,
    resetTheme: () => nextTheme.setTheme(defaultTheme)
  }
}
