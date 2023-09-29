import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { amber, red } from "@mui/material/colors";

import CssBaseline from "@mui/material/CssBaseline";
import AppProvider from "./context/AppProvider";
import Main from "./pages/Main";
import Header from "./components/Header";
const theme = createTheme({
  palette: {
    primary: {
      main: amber[500],
    },
    secondary: {
      main: red[500],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Container flex={1} maxWidth={false} disableGutters>
          <Header />
          <Main />
        </Container>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
