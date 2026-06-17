import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

const STORAGE_KEY = "ocf-app-theme"

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as "light" | "dark" | null
        if (stored) return stored

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
    })

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    const toggle = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
    }

    return (
        <Button variant="secondary" size="icon" onClick={toggle}>
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="hidden h-4 w-4 dark:block" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}