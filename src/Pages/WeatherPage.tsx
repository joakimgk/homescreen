import styled, { css } from "styled-components";
import { Weather } from "../Weather/Weather";
import { Ukeplan } from "../Ukeplan/Ukeplan";
import { Meldinger } from "../Meldinger/Meldinger";
import { PrecipitationTrendProvider } from "../contexts/PrecipitationTrendContext";
import { BERGEN, SANLORENZO } from "../Weather/locations";

const Content = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  height: 90vh;
  background: lightblue;
`;

const WeatherContainer = styled.div`
  flex: 2.5;
  background: lightblue;
`;

const UkeplanContainer = styled.div`
  flex: 1.1;
  background: lightgreen;
`;

const MeldingerContainer = styled.div`
  flex: 2;
  background: lightcoral;
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
        <PrecipitationTrendProvider>
          <WeatherContainer>
            <Weather header="San Lorenzo al Mare" location={SANLORENZO} />
          </WeatherContainer>
        </PrecipitationTrendProvider>
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