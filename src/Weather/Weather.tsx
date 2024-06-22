import styled from "styled-components";
import { useWeather } from "../services/weatherService";
import { WeatherEntry } from "./WeatherEntry";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Weather = () => {

    const { data: weather } = useWeather();

    return (
        <Container>
            {weather?.properties?.timeseries.map((w: any) => (
                <WeatherEntry weather={w} />
            ))}
        </Container>
    )
}