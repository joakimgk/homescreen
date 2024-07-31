import styled, { css } from "styled-components";
import { Weather } from "../Weather/Weather";
import { Ukeplan } from "../Ukeplan/Ukeplan";
import { Meldinger } from "../Meldinger/Meldinger";
import { PrecipitationTrendProvider } from "../contexts/PrecipitationTrendContext";
import { BERGEN, LEVANGER, SANLORENZO } from "../Weather/locations";

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
      <WeatherContainer>
        <Weather isPrimary location={BERGEN} />
      </WeatherContainer>
      {summer ? (
        <WeatherContainer>
          <Weather location={LEVANGER} />
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