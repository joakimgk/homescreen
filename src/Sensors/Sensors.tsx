import styled from "styled-components"
import { Sensor } from "./Sensor";

const Container = styled.div`
    display: flex;
`;

export const Sensors = () => {

    return (
        <Container>
            <Sensor />
        </Container>
    );
}