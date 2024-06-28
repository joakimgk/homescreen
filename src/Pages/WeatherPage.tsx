import styled from "styled-components";
import ConsoleLogger from "../utils/ConsoleLogger";
import { Weather } from "../Weather/Weather";
import { Ukeplan } from "../Ukeplan/Ukeplan";
import { Meldinger } from "../Meldinger/Meldinger";
import { PrecipitationTrendProvider } from "../contexts/PrecipitationTrendContext";

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const WeatherContainer = styled.div`
  flex: 2.5;
  background: lightblue; /* Adjust to your needs */
`;

const UkeplanContainer = styled.div`
  flex: 1.1;
  background: lightgreen; /* Adjust to your needs */
`;

const MeldingerContainer = styled.div`
  flex: 2;
  background: lightcoral; /* Adjust to your needs */
`;

export const WeatherPage = () => (
  <Content>
    <PrecipitationTrendProvider>
      <WeatherContainer>
        <Weather />
      </WeatherContainer>
    </PrecipitationTrendProvider>
    <UkeplanContainer>
      <Ukeplan />
    </UkeplanContainer>
    <MeldingerContainer>
      <Meldinger />
      {/* <ConsoleLogger /> */}
    </MeldingerContainer>
  </Content>
);