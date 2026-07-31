/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

    // On mount, check which class the layout script actually applied
    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark')
        setTheme(isDark ? 'dark' : 'light')
    }, [])

    const toggleTheme = () => {
        if (!theme) return

        const nextTheme = theme === 'dark' ? 'light' : 'dark'

        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }

        setTheme(nextTheme)
    }

    // Prevent hydration mismatch layout shifts
    if (!theme) {
        return <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
    }

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 font-medium border rounded-md transition-colors 
                 bg-gray-100 border-gray-300 text-black 
                 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
        >
            Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
    )
}
