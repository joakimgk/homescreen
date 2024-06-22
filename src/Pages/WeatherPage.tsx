import styled from "styled-components";
import ConsoleLogger from "../utils/ConsoleLogger";
import { Weather } from "../Weather/Weather";
import { Ukeplan } from "../Ukeplan/Ukeplan";

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const WeatherContainer = styled.div`
  flex: 3;
  background: lightblue; /* Adjust to your needs */
`;

const UkeplanContainer = styled.div`
  flex: 1;
  background: lightgreen; /* Adjust to your needs */
`;

const MeldingerContainer = styled.div`
  flex: 2;
  background: lightcoral; /* Adjust to your needs */
`;

export const WeatherPage = () => (
  <Content>
    <WeatherContainer>
      <Weather />
    </WeatherContainer>
    <UkeplanContainer>
      <Ukeplan />
    </UkeplanContainer>
    <MeldingerContainer>
      <ul>
        <li>SWR</li>
        <li>Axios</li>
        <li>SWR fetcher og swrConfig (App.tsx)</li>
        <li>client.ts</li>
        <li>useWeather()</li>
        <li>fetch polyfill</li>
        <li>Styled components</li>
        <li>Images</li>
        <li>Static hosting</li>
        <li>Routing (wouter)</li>
        <li>Various polyfills</li>
        <li>env variables (basepath)</li>
      </ul>
      {/* <ConsoleLogger /> */}
    </MeldingerContainer>
  </Content>
);