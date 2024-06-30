import styled, { css } from "styled-components";
import { useWeather } from "../services/weatherService";
import { WeatherEntry } from "./WeatherEntry";
import dayjs from "dayjs";
import { useEffect } from "react";
import { usePrecipitationTrendContext } from "../contexts/PrecipitationTrendContext";
import { Icons } from "../Shared/Icons";

const Container = styled.div<{ primary?: number }>`
    display: flex;
    flex-direction: column;
    background: lightblue;

    
    ${props => props.primary === 0 && css`
        border-left: 1px solid #E4E4E4;
        padding-left: 1em;
    `}
`;

const Header = styled.div`
    display: flex;
    font-size: 1.3em;
    font-weight: 600;
    padding: 0.2em 0 0 0.5em;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const DateHeader = styled.div`
    display: flex;
    font-size: 1em;
    align-items: center;
    font-weight: 600;
    padding: 0.5em 0 0.5em 0.7em;
`;

const Icon = styled.div`
    display: flex;
    padding-left: 0.5em;
    
    img {
        height: 2.5em;
    }
`;

export const Weather = ({ location, header, isPrimary = false }: { location: string, header: string, isPrimary?: boolean }) => {

    const { data: weather } = useWeather(location);
    const { registerSeries } = usePrecipitationTrendContext();

    useEffect(() => {
        if (weather?.properties.timeseries && registerSeries) {
            registerSeries(weather.properties.timeseries);
        }
    }, [weather, registerSeries]);


    let prev = 25; // init
    return (
        <Container primary={isPrimary ? 1 : 0}>
            <Header>{header}</Header>

            {weather?.properties?.timeseries.map(w => {
                const date = dayjs(w.time, 'YYYY-MM-DD', 'no');

                const u = <Wrapper key={new Date(w.time).valueOf()}>
                    {date.hour() < prev && (
                        <DateHeader>
                            {date.format('dddd DD. MMMM')}
                            <Icon>{isPrimary && <Icons date={date} />}</Icon>
                        </DateHeader>
                    )}
                    <WeatherEntry weather={w} />
                </Wrapper>;

                prev = date.hour();
                return u;
            })}
        </Container>
    )
}