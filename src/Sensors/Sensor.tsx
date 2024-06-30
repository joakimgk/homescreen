import styled, { css } from "styled-components"
import { useData } from "../services/sensorService";
import { Client, Activity } from "../../types/supabaseTypes";
import dayjs from "dayjs";

const Wrapper = styled.div<{ inactive: string, status: string }>`
    display: flex;
    padding: 2em;
    border: 2px dashed orange;
    ${props => props.inactive === 'true' && css`
        opacity: 0.4;
    `};
    background-color: ${props => props.status};
`;

// alarm om dør er åpen og det er regn!
// åpen mellom 22-09, eller i arbeidstid
export const Sensor = ({ data }: { data: Client }) => {

    const { data: lastActivity } = useData<Activity[]>('v_event_last_activity', 'client_id=eq.' + data.id);

    const lockSensor = lastActivity?.find(a => a.button_id === 'button1');
    const doorSensor = lastActivity?.find(a => a.button_id === 'button2');

    const isInactive = (time?: string | null) =>
        dayjs(time, 'YYYY-MM-DDTHH:MM:SS', 'no').isBefore(dayjs().add(-14, 'days'));

    const getStatus = () => {
        let color = 'green';
        if (!lockSensor || !doorSensor) return 'grey';
        if (lockSensor?.button_state !== 'on') {
            color = 'red';
            if (doorSensor?.button_state !== 'on') {
                color = 'blue';
            }
        }
        return color;
    }

    const inactive = isInactive(lockSensor?.last_active) || isInactive(doorSensor?.last_active);

    if (inactive) {
        return null;
    }

    return (
        <Wrapper inactive={inactive.toString()} status={getStatus()}>
            {/* {data.name} */}
        </Wrapper >
    )
}