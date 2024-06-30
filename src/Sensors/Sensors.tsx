import styled from "styled-components"
import { useData } from "../services/sensorService";
import { Sensor } from "./Sensor";
import { Client } from "../../types/supabaseTypes";
import { useAuthContext } from "../contexts/AuthContext";
import { Login } from "../Auth/Login";

const Container = styled.div`
    display: flex;
    margin: 0.3em;
`;

export const Sensors = () => {

    const { isLoggedIn } = useAuthContext();
    const { data: clients } = useData<Client[]>(isLoggedIn ? 'client' : undefined);

    return (
        <Container>
            {isLoggedIn ? (
                <>{clients?.map(s => (<Sensor key={s.id} data={s} />))}</>
            ) : (
                <Login />
            )}
        </Container>
    );
}