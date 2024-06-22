import dayjs from "dayjs";
import { ModifierKeyz, icons, modifiers } from "../services/icons";
import styled from "styled-components";
import { Timeserie } from "../services/longterm";
import { useWeather } from "../services/weatherService";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.2em 1em;
    font-size: 1.7em;
`;

const Time = styled.div`
    display: flex;
    font-size: 0.5em;
`;

const Icon = styled.div`
    display: flex;
    position: relative;
    top: -0.3em;
    img {
        height: 1.6em;
    }
`;

const Temperature = styled.div`
    display: flex;
    position: relative;
    top: -0.7em;
`;

export const LongtermEntry = ({ longterm }: { longterm: Timeserie }) => {
    const { data: weather } = useWeather();

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


    return (
        <Container>
            <Time>{dayjs(longterm.time, 'YYYY-MM-DD', 'no').format('dddd D/M')}</Time>
            <Icon><img src={`img/100/${icon}.png`} /></Icon>
            <Temperature>{Math.round(summary.details.air_temperature_max)}&nbsp;&deg;</Temperature>
        </Container>
    );
}