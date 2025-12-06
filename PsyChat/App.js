// App.js
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { UserProvider, ProgressProvider } from "./contexts";
import Navigation from "./navigations";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ProgressProvider>
          <Navigation />
        </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
