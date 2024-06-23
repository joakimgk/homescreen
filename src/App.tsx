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

import styled from 'styled-components';
import { Longterm } from './Longterm/Longterm';
import { WeatherPage } from './Pages/WeatherPage';
import { UkeplanPage } from './Pages/UkeplanPage';
import { Route, Router } from 'wouter';
import { Sensors } from './Sensors/Sensors';

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

const swrConfig = {
  refreshInterval: 30000,
  fetcher
};

const HeaderContainer = styled.div`
  flex: 0 0 10%; /* Equivalent to 0.5fr out of 4.5fr total */
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

const basePath = process.env.REACT_APP_BASE_URL || '/';

const App = () => {

  return (
    <SWRConfig value={swrConfig}>
      <Layout>
        <HeaderContainer>
          <Longterm />
          <Sensors />
        </HeaderContainer>
        <Content>
          <Router base={basePath}>
            <Route path="/" component={WeatherPage} />
            <Route path="/ukeplan" component={UkeplanPage} />
          </Router>
        </Content>
      </Layout>
    </SWRConfig>
  );
}

export default App;
