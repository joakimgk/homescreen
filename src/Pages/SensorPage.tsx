import styled from "styled-components";
import { useData } from "../services/sensorService";
import { useParams } from "wouter";

const Content = styled.div`
  display: flex;
  background-color: red;
`;


export const SensorPage = () => {
    const params = useParams();
    const { data: activity } = useData<Event[]>('event', 'client_id=eq.' + params.clientid + '&order=created_at.desc');

    console.log(params, activity);

    return (
        <Content>
            <h1>Sensor</h1>
        </Content>
    );
};