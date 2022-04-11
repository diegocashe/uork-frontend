import { ThemeProvider } from '@mui/material/styles'
import { createContext, useState } from "react";
import { LigthTheme } from "../theme/LigthTheme";
import { Theme } from '../theme/Theme';

export const ThemeContext = createContext({
    theme: LigthTheme,
    changeTheme: () => { },
    toggleThemeMode: () => { }
})

export const ThemeContextProvider = ({ value, children }) => {
    const [theme, setTheme] = useState(Theme('light'))

    const changeTheme = (theme) => {
        setTheme(theme)
    }

    const toggleThemeMode = () => {
        if (theme.palette.mode === 'light'){
            setTheme(Theme('dark'))
        }else{
            setTheme(Theme('light'))
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, toggleThemeMode }}>
            <ThemeProvider theme={theme} >
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
