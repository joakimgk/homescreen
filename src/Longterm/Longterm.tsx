import styled from "styled-components";
import { Timeserie } from "../services/longterm";
import { useLongterm } from "../services/weatherService";
import { LongtermEntry } from "./LongtermEntry";
import dayjs from "dayjs";

const Container = styled.div`
    display: flex;
`;

export const Longterm = () => {

    const { data: longterm } = useLongterm();

    return (
        <Container>
            {longterm?.properties.timeseries.map((w: Timeserie) => (
                <LongtermEntry key={new Date(w.time).valueOf()} longterm={w} />
            ))}
        </Container>
    )
}