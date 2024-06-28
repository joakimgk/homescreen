import styled, { css } from "styled-components";
import ConsoleLogger from "../utils/ConsoleLogger";
import { Weather } from "../Weather/Weather";
import { Ukeplan } from "../Ukeplan/Ukeplan";
import { Meldinger } from "../Meldinger/Meldinger";
import { PrecipitationTrendProvider } from "../contexts/PrecipitationTrendContext";
import { BERGEN, SANLORENZO } from "../Weather/locations";

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const WeatherContainer = styled.div<{ secondary?: number }>`
  flex: 2.5;
  background: lightblue; /* Adjust to your needs */

  ${props => props.secondary && css`
    border-left: 1px solid #E4E4E4;
    padding-left: 1em;
  `}
`;

const UkeplanContainer = styled.div`
  flex: 1.1;
  background: lightgreen; /* Adjust to your needs */
`;

const MeldingerContainer = styled.div`
  flex: 2;
  background: lightcoral; /* Adjust to your needs */
`;

export const WeatherPage = () => {

  const summer = true;

  return (
    <Content>
      <PrecipitationTrendProvider>
        <WeatherContainer>
          <Weather isPrimary header="Bergen" location={BERGEN} />
        </WeatherContainer>
      </PrecipitationTrendProvider>
      {summer ? (
        <WeatherContainer secondary={1}>
          <Weather header="San Lorenzo al Mare" location={SANLORENZO} />
        </WeatherContainer>
      ) : (
        <>
          <UkeplanContainer>
            <Ukeplan />
          </UkeplanContainer>
          <MeldingerContainer>
            <Meldinger />
            {/* <ConsoleLogger /> */}
          </MeldingerContainer>
        </>
      )
      }
    </Content>
  );
};