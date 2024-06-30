import dayjs from "dayjs";
import { ModifierKeyz, icons, modifiers } from "../services/icons";
import styled from "styled-components";
import { Timeserie } from "../services/longterm";
import { useWeather } from "../services/weatherService";
import { useHolidayContext } from "../contexts/HolidayContext";
import { BERGEN } from "../Weather/locations";
import { Icons } from "../Shared/Icons";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.2em 0.5em;
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
    align-items: center;

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
    const { data: weather } = useWeather(BERGEN);
    const { isBirthday } = useHolidayContext();

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
    const birthday = isBirthday && isBirthday(date);

    return (
        <Container>
            <Time>{date.format('ddd D/M')}</Time>
            <Icon>
                <img src={`img/100/${icon}.png`} />
                <Icons date={date} />
            </Icon>
            <Temperature>
                {!!birthday ? birthday.navn : <>{Math.round(summary.details.air_temperature_max)}&deg;</>}
            </Temperature>
        </Container>
    );
}