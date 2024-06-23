import styled from "styled-components"
import { getData, getjwtoken } from "../services/sensorService";
import { useEffect, useState } from "react";
import { Sensor } from "./Sensor";

// type Client = Database["public"]["Tables"]["client"]["Row"];

const Container = styled.div`
    display: flex;
`;

export const Sensors = () => {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        getData('client', '').then(response => setClients(JSON.parse(response)));
    }, []);

    return (
        <Container>
            {clients?.map((s: any) => (<Sensor />))}
        </Container>
    );
}