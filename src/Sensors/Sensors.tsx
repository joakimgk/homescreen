import styled from "styled-components"
import { useData } from "../services/sensorService";
import { Sensor } from "./Sensor";
import { Client } from "../../types/supabaseTypes";

const Container = styled.div`
    display: flex;

    margin: 0.3em;
`;

export const Sensors = () => {

    const { data: clients } = useData<Client[]>('client');

    return (
        <Container>
            {clients?.map(s => (<Sensor key={s.id} data={s} />))}
        </Container>
    );
}