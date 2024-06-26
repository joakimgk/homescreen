import dayjs from "dayjs";
import { ModifierKeyz, icons, modifiers } from "../services/icons";
import styled from "styled-components";
import { Timeserie } from "../services/weather";
import { useHolidayContext } from "../contexts/HolidayContext";

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
`;

export const WeatherEntry = ({ weather }: { weather: Timeserie }) => {
    const forecast = weather.data.next_1_hours || weather.data.next_6_hours || weather.data.next_12_hours;

    if (!forecast) return null;

    const pad = (val: number) => {
        return val < 10 ? '0' + val : '' + val;
    };
    const wpad = (val: number[]) => {
        return val.length < 2 ? '&nbsp;&nbsp;' + val : val;
    };

    const key = forecast.summary.symbol_code.split('_');
    const k = key[1] as ModifierKeyz;
    let icon = pad(icons[key[0]].id);
    if (key.length > 1) icon += modifiers[k];

    const date = dayjs(weather.time, 'YYYY-MM-DD', 'no');
    const showMinutes = dayjs().format('DD HH') === date.format('DD HH');

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
            <Wind>{weather.data.instant.details.wind_speed} m/s</Wind>
        </Container>
    );
}