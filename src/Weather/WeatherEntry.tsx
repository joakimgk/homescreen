import dayjs from "dayjs";
import { ModifierKeyz, icons, modifiers } from "../services/icons";
import styled from "styled-components";
import { Timeserie, Next1_HoursDetails } from "../services/weather";
import { pad, padD } from "../utils/helpers";
import { usePrecipitationTrendContext } from "../contexts/PrecipitationTrendContext";

const Container = styled.div`
    display: flex;
    justify-content: space-between; 
    padding: 0.2em 1em;
    font-size: 1.3em;
`;

const Time = styled.div`
    display: flex;
    font-weight: 600;
`;

const Icon = styled.div`
    display: flex;
    img {
        height: 1.6em;
    }
`;

const Temperature = styled.div`
    display: flex;
`;

const Wind = styled.div`
    display: flex;
const Precipitation = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.6em;
    flex: 1.6;
`;

const History = styled.div`
    display: inline;
    font-size: 0.6em;
    padding: 0 1em;
`;

const RainIndicator = styled.div<{ precipitation_amount?: number }>`
    display: flex;
    background-color: #007FFF;
    width: ${props => (props.precipitation_amount ? props.precipitation_amount : 0) / 15.0 * 80.0}%;
    height: 12px;
`;

export const WeatherEntry = ({ weather }: { weather: Timeserie }) => {
    const forecast = weather.data.next_1_hours || weather.data.next_6_hours || weather.data.next_12_hours;
    const { getTrend } = usePrecipitationTrendContext();

    if (!forecast) return null;

    const key = forecast.summary.symbol_code.split('_');
    const k = key[1] as ModifierKeyz;
    let icon = pad(icons[key[0]].id);
    if (key.length > 1) icon += modifiers[k];

    const date = dayjs(weather.time, 'YYYY-MM-DD', 'no');
    const showMinutes = dayjs().format('DD HH') === date.format('DD HH');

    const rainMM = (forecast.details as Next1_HoursDetails).precipitation_amount;

    const trend = getTrend(date);

    return (
        <Container>
            <Time>
                {date.format('HH')}
                {showMinutes && (
                    <span>{`:${dayjs().format('mm')}`}</span>
                )}
            </Time>
            <Icon>
                <img src={`img/100/${icon}.png`} />
            </Icon>
            <Temperature>{Math.round(weather.data.instant.details.air_temperature)}&deg;</Temperature>
            <Precipitation>
                {!!rainMM && rainMM > 0 && (
                    <>{`${padD(rainMM)} mm`}
                        <History>t: {trend}</History>
                        <RainIndicator precipitation_amount={rainMM} />
                    </>
                )}
            </Precipitation>
            <Wind>{weather.data.instant.details.wind_speed} m/s</Wind>
        </Container>
    );
}