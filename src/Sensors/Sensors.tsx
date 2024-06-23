import styled from "styled-components"
import { getData } from "../services/sensorService";
import { useEffect, useState } from "react";
import { Sensor } from "./Sensor";
import { Client } from "../../types/supabaseTypes";

const Container = styled.div`
    display: flex;
`;

export const Sensors = () => {

    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        getData('client', '').then(response => setClients(JSON.parse(response)));
    }, []);

    return (
        <Container>
            {clients?.map(s => (<Sensor key={s.id} data={s} />))}
        </Container>
    );
}