import dayjs from "dayjs";
import { ModifierKeyz, icons, modifiers } from "../services/icons";
import styled from "styled-components";
import { Timeserie, Next1_HoursDetails } from "../services/weather";
import { pad, padD } from "../utils/helpers";
import { usePrecipitationTrendContext } from "../contexts/PrecipitationTrendContext";
import { Clock } from "./Clock";
import { Location } from "./locations";

const Container = styled.div`
    display: flex;
    justify-content: space-between; 
    padding: 3px 1em;
    font-size: 16px;

    /* define base font size */
    font-size: 1.6em;
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: 1.3em;
    }
`;

const Time = styled.div`
    display: flex;
    align-items: flex-start;
    font-size: 70%;
    flex: 1;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    img {
        height: 1.3em;
        @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
            height: 1.5em;
        }
    }
`;

const Temperature = styled.div`
    display: flex;
    font-size: 70%;
    align-items: center;
    flex: 1;
`;

const Wind = styled.div`
    display: flex;
    font-size: 50%;
    align-items: center;
    flex: 1;
`;

const Precipitation = styled.div`
    display: flex;
    align-items: center;
    font-size: 50%;
    flex: 1.6;
`;

const History = styled.div`
    display: inline;
    font-size: 70%;
    padding: 0 1em;
`;

const RainIndicator = styled.div<{ precipitation_amount?: number }>`
    display: flex;
    background-color: #007FFF;
    width: ${props => (props.precipitation_amount ? props.precipitation_amount : 0) / 15.0 * 80.0}%;
    height: 12px;
`;

export const WeatherEntry = ({ location, weather }: { location: Location, weather: Timeserie }) => {
    const forecast = weather.data.next_1_hours || weather.data.next_6_hours || weather.data.next_12_hours;
    const { getTrend, getSeries } = usePrecipitationTrendContext();

    if (!forecast) return null;

    const key = forecast.summary.symbol_code.split('_');
    const k = key[1] as ModifierKeyz;
    let icon = pad(icons[key[0]].id);
    if (key.length > 1) icon += modifiers[k];

    const date = dayjs(weather.time, 'YYYY-MM-DD', 'no');
    const showMinutes = dayjs().format('DD HH') === date.format('DD HH');

    const rainMM = (forecast.details as Next1_HoursDetails).precipitation_amount;

    const trend = getTrend(location.key, date);
    const series = getSeries(location.key, date);

    return (
        <Container>
            <Time>
                {showMinutes ? <Clock /> : <>{date.format('HH')}</>}
            </Time>
            <Icon>
                <img src={`img/100/${icon}.png`} />
            </Icon>
            <Temperature>{Math.round(weather.data.instant.details.air_temperature)}&deg;</Temperature>
            <Precipitation>
                {!!rainMM && rainMM > 0 && (
                    <>{`${padD(rainMM)} mm`}
                        <History>t: {trend} (d: {series ? series.length : '-'})</History>
                        <RainIndicator precipitation_amount={rainMM} />
                    </>
                )}
            </Precipitation>
            <Wind>{weather.data.instant.details.wind_speed} m/s</Wind>
        </Container>
    );
}