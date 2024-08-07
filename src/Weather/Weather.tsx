import styled, { css } from "styled-components";
import { useWeather } from "../services/weatherService";
import { WeatherEntry } from "./WeatherEntry";
import dayjs from "dayjs";
import { useEffect } from "react";
import { usePrecipitationTrendContext } from "../contexts/PrecipitationTrendContext";
import { Icons } from "../Shared/Icons";
import 'dayjs/locale/nb';  // Import Norwegian locale
import localeData from 'dayjs/plugin/localeData';
import { capitalizeFirstLetter } from "../utils/helpers";
import { Location } from "./locations";

dayjs.extend(localeData);
dayjs.locale('nb');  // Set the locale to Norwegian

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

export const Weather = ({ location, isPrimary = false }: { location: Location, isPrimary?: boolean }) => {

    const { data: weather } = useWeather(location.loc);
    const { registerSeries } = usePrecipitationTrendContext();

    useEffect(() => {
        if (weather?.properties.timeseries && registerSeries) {
            registerSeries(location.key, weather.properties.timeseries);
        }
    }, [weather, registerSeries]);



    let prev = 25; // init
    return (
        <Container primary={isPrimary ? 1 : 0}>
            <Header>{location.name}</Header>

            {weather?.properties?.timeseries.map(w => {
                const date = dayjs(w.time, 'YYYY-MM-DD', 'no');

                const u = <Wrapper key={new Date(w.time).valueOf()}>
                    {date.hour() < prev && (
                        <DateHeader>
                            {capitalizeFirstLetter(date.format('dddd D. MMMM'))}
                            <Icon>{isPrimary && <Icons date={date} />}</Icon>
                        </DateHeader>
                    )}
                    <WeatherEntry location={location} weather={w} isPrimary={isPrimary} />
                </Wrapper>;

                prev = date.hour();
                return u;
            })}
        </Container>
    )
}