import './App.css';
import { SWRConfig } from 'swr';

// Import polyfills
import 'es6-promise/auto'; // for Promise
import 'whatwg-fetch'; // for fetch
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable'; // For other modern features support
import 'core-js/es/map'; // Polyfill Map
import 'core-js/es/set'; // Polyfill Set
import 'core-js/es/promise'; // Polyfill Promise

import styled, { ThemeProvider } from 'styled-components';
import { Longterm } from './Longterm/Longterm';
import { WeatherPage } from './Pages/WeatherPage';
import { UkeplanPage } from './Pages/UkeplanPage';
import { Route, Router } from 'wouter';
import { Sensors } from './Sensors/Sensors';
import { HolidayProvider } from './contexts/HolidayContext';
import { theme } from './theme';
import { AuthProvider, BasicCredentials } from './contexts/AuthContext';
import { SensorPage } from './Pages/SensorPage';

// Feature detection and fallback for fetch
if (!window.fetch) {
  // Polyfill fetch API
  window.fetch = require('whatwg-fetch').fetch;
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

/*
 The comma after <T> ensures TypeScript correctly interprets the function signature 
 when used with multiple generic parameters.
 */
export const authFetcher = async (
  input: RequestInfo,
  init: RequestInit,
  credentials: BasicCredentials | undefined,
  ...args: any[]
) => {
  const headers = new Headers(init.headers || {});
  headers.set(
    'Authorization',
    'Basic ' + btoa(`${credentials?.username}:${credentials?.password}`)
  );
  const res = await fetch(input, { ...init, headers });
  return res.json();
};

export const textFetcher = async (
  input: RequestInfo,
  init: RequestInit,
  credentials: BasicCredentials | undefined,
  ...args: any[]): Promise<string> => {
  const headers = new Headers();
  headers.set(
    'Authorization',
    'Basic ' + btoa(`${credentials?.username}:${credentials?.password}`)
  );
  const response = await fetch(input, { ...init, headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${input}`);
  }
  return response.text();
}

const swrConfig = {
  refreshInterval: 30000,
  fetcher
};

const HeaderContainer = styled.div`
display: flex;
  flex: 0 0 10%; /* Equivalent to 0.5fr out of 4.5fr total */
  flex-direction: row;
  justify-content: space-between;
  background: lightgrey; /* Adjust to your needs */
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const basePath = process.env.REACT_APP_BASE_URL || '';

const App = () => {
  return (
    <SWRConfig value={swrConfig}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Router base={basePath}>
              <HolidayProvider>
                <HeaderContainer>
                  <Longterm />
                  <Sensors />
                </HeaderContainer>
                <Content>

                  <Route path="/" component={WeatherPage} />
                  <Route path="/sensor/:clientid" component={SensorPage} />
                  <Route path="/ukeplan" component={UkeplanPage} />
                  <Route path="ukeplan" component={UkeplanPage} />

                </Content>
              </HolidayProvider>
            </Router>
          </Layout>
        </ThemeProvider>
      </AuthProvider>
    </SWRConfig >
  );
}

export default App;
