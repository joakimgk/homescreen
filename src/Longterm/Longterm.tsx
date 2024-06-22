import styled from "styled-components";
import { Timeserie } from "../services/longterm";
import { useLongterm, useWeather } from "../services/weatherService";
import { LongtermEntry } from "./LongtermEntry";
import { useEffect } from "react";

const Container = styled.div`
    display: flex;
`;

export const Longterm = () => {

    const { data: longterm } = useLongterm();

    useEffect(() => {
        console.log('Header loaded');
    }, []);

    return (
        <Container>
            {longterm?.properties.timeseries.map((w: Timeserie) => (
                <LongtermEntry longterm={w} />
            ))}
        </Container>
    )
}