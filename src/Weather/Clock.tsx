import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: flex-start;

    font-weight: 600;
    font-size: 1.1em;
`;

export const Clock = () => {
    const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>(dayjs());

    useEffect(() => {
        // Function to update the current time
        const updateCurrentTime = () => {
            setCurrentTime(dayjs());
        };

        // Initial call to set the current time
        updateCurrentTime();

        // Calculate the remaining time until the next full minute
        const now = dayjs();
        const delay = 60000 - (now.second() * 1000 + now.millisecond());

        // Set a timeout to update at the next full minute
        const timeout = setTimeout(() => {
            updateCurrentTime();

            // Set an interval to update every minute after the initial update
            const interval = setInterval(updateCurrentTime, 60000);

            // Clear the interval when the component unmounts
            return () => clearInterval(interval);
        }, delay);

        // Clear the timeout if the component unmounts before the first update
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Container>
            {currentTime.format('HH:mm')}
        </Container>
    );
};
