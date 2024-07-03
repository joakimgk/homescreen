import styled from "styled-components";
import { Link, useParams } from "wouter";
import { SensorChart } from "../Sensors/SensorChart";

const Content = styled.div`
  display: flex;
  height: 80vh;
`;


export const SensorPage = () => {
    const params = useParams();
    const clientId = params.clientid;

    if (!clientId) return null;

    return (
        <Content>
            <Link href="/">Back</Link>
            <SensorChart clientId={clientId} />
        </Content>
    );
};