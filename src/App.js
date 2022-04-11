import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./config/AppRoutes";
import { UserContextProvider } from "./context/UserContext";
import "@fontsource/manrope"
import { CookiesProvider } from "react-cookie";
import { useAuthToken } from "./hooks/useAuthToken";
import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { PROFILE } from "./const/routes";
import { useUser } from "./hooks/useUser";
import { LoadAppContextProvider } from "./context/LoadAppContext";
import { LigthTheme } from "./theme/LigthTheme";
import { DarkTheme } from "./theme/DarkTheme";
import { ThemeContextProvider } from "./context/ThemeContext";

function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <UserContextProvider>
          <ThemeContextProvider>
            <LoadAppContextProvider>
              <AppRoutes />
            </LoadAppContextProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
