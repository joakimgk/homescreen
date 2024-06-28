import dayjs from "dayjs";
import { ModifierKeyz, icons, modifiers } from "../services/icons";
import styled from "styled-components";
import { Timeserie } from "../services/longterm";
import { useWeather } from "../services/weatherService";
import { useHolidayContext } from "../contexts/HolidayContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 12vw;
    overflow: hidden;
    padding: 0.2em 1.5em;
    align-items: center;
    font-size: 1.7em;
`;

const Time = styled.div`
    display: flex;
    font-size: 0.5em;
    color: darkblue;
    white-space: nowrap;
`;

const Icon = styled.div`
    display: flex;

    img {
        height: 1.6em;
    }
`;

const Temperature = styled.div`
    display: flex;
    position: relative;
    font-size: 0.5em;
`;

export const LongtermEntry = ({ longterm }: { longterm: Timeserie }) => {
    const { data: weather } = useWeather();
    const { isHoliday } = useHolidayContext();

    const summary = longterm.data.next_24_hours;
    if (!summary) return null;

    const forecast = weather?.properties.timeseries.find(t => dayjs(t.time, 'YYYY-MM-DD', 'no').isSame(dayjs(longterm.time, 'YYYY-MM-DD', 'no')));
    const symbolCode = (forecast?.data.next_1_hours || forecast?.data.next_6_hours || forecast?.data.next_12_hours)?.summary.symbol_code;

    if (!forecast) return null;

    const pad = (val: number) => {
        return val < 10 ? '0' + val : '' + val;
    };

    let icon = undefined;
    if (symbolCode) {
        const key = symbolCode?.split('_');
        const k = key[1] as ModifierKeyz;
        icon = pad(icons[key[0]].id);
        if (key.length > 1) icon += modifiers[k];
    }

    const date = dayjs(longterm.time, 'YYYY-MM-DD', 'no');

    return (
        <Container>
            <Time>{date.format('ddd D/M')}</Time>
            <Icon>
                <img src={`img/100/${icon}.png`} />
                {isHoliday && isHoliday(date) && (
                    <img src={`img/flagg.png`} />
                )}
            </Icon>
            <Temperature>{Math.round(summary.details.air_temperature_max)}&deg;</Temperature>
        </Container>
    );
}