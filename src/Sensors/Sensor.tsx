import styled, { css } from "styled-components"
import { useData } from "../services/sensorService";
import { Client, Activity, Event } from "../../types/supabaseTypes";
import dayjs from "dayjs";
import { Link } from "wouter";

const Wrapper = styled.div<{ inactive: string, status: string }>`
    display: flex;
    padding: 2em;
    border: 2px dashed orange;
    ${props => props.inactive === 'true' && css`
        opacity: 0.4;
    `};
    background-color: ${props => props.status};
`;

const statusColor = (status?: SensorStatus): string => {
    switch (status) {
        case SensorEnum.Red:
            return "red";
        case SensorEnum.Green:
            return "green";
        case SensorEnum.Blue:
            return "blue";
        default:
            return "grey";
    }
}

export enum SensorEnum {
    Green = "0",
    Red = "1",
    Blue = "2"
}
export type SensorStatus = SensorEnum;

const LOCK_SENSOR = 'button1', DOOR_SENSOR = 'button2';

export const getStatus = (event: Event | Activity): SensorStatus => {
    if (event.button_id === DOOR_SENSOR) {
        if (event.button_state === "on") {
            return SensorEnum.Red;
        }
        return SensorEnum.Blue;
    }
    if (event.button_state === "on") {
        return SensorEnum.Green;
    }
    return SensorEnum.Red;
}

// alarm om dør er åpen og det er regn!
// åpen mellom 22-09, eller i arbeidstid
export const Sensor = ({ data }: { data: Client }) => {

    const { data: lastActivity } = useData<Activity[]>('v_event_last_activity', 'client_id=eq.' + data.id + '&order=created_at.desc');

    const lockSensor = lastActivity?.find(a => a.button_id === 'button1');
    const doorSensor = lastActivity?.find(a => a.button_id === 'button2');

    const isInactive = (time?: string | null) =>
        dayjs(time, 'YYYY-MM-DDTHH:MM:SS', 'no').isBefore(dayjs().add(-14, 'days'));

    const status = lastActivity ? getStatus(lastActivity[0]) : undefined;

    const inactive = isInactive(lockSensor?.last_active) || isInactive(doorSensor?.last_active);

    if (inactive) {
        return null;
    }

    const link = `/sensor/${data.id}`;

    return (
        <>
            <Link href={link}>
                <Wrapper inactive={inactive.toString()} status={statusColor(status)}>
                    {/* {data.name} */}
                    {/* {lastActivity && lastActivity[0].button_id === 'button1' ? 'lock' : 'door'} */}
                </Wrapper >
            </Link>
        </>
    )
}