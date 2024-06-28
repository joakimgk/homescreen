import styled from "styled-components";
import { useWeather } from "../services/weatherService";
import { WeatherEntry } from "./WeatherEntry";
import dayjs from "dayjs";
import { useHolidayContext } from "../contexts/HolidayContext";
import { useEffect } from "react";
import { usePrecipitationTrendContext } from "../contexts/PrecipitationTrendContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const DateHeader = styled.div`
    display: flex;
    font-size: 1.2em;
    font-weight: 700;
    padding: 0.5em 0 0 0.5em;
`;

const Icon = styled.div`
    display: flex;
    padding-left: 0.5em;
    
    img {
        height: 1.6em;
    }
`;

export const Weather = () => {

    const { data: weather } = useWeather();
    const { isHoliday } = useHolidayContext();
    const { registerSeries, series } = usePrecipitationTrendContext();

    useEffect(() => {
        if (weather?.properties.timeseries && registerSeries) {
            registerSeries(weather.properties.timeseries);
        }
    }, [weather, registerSeries]);

    let prev = 25; // init
    const now = dayjs();

    return (
        <Container>
            {weather?.properties?.timeseries.map(w => {
                const date = dayjs(w.time, 'YYYY-MM-DD', 'no');

                const u = <Wrapper key={new Date(w.time).valueOf()}>
                    {date.hour() < prev && (
                        <DateHeader>
                            {date.format('dddd DD. MMMM')}
                            {isHoliday && isHoliday(date) && (
                                <Icon>
                                    <img src={`img/flagg.png`} />
                                </Icon>
                            )}
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