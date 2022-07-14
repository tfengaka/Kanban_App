import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/customScroll.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Board from './pages/Board';

function App() {
  const theme = createTheme({
    palette: { mode: 'dark' },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="boards" element={<Home />} />
            <Route path="boards/:id" element={<Board />} />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
