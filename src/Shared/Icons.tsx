import dayjs from "dayjs";
import { useHolidayContext } from "../contexts/HolidayContext";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
`;

const Birthday = styled.div`
    display: flex;

    img {
        height: 1.3em;
    }
`;

export const Icons = ({ date }: { date: dayjs.Dayjs }) => {
    const { isHoliday, isBirthday } = useHolidayContext();

    const birthday = isBirthday && isBirthday(date);

    return (
        <Container>
            {isHoliday && isHoliday(date) && (
                <img src={`img/flagg.png`} />
            )}
            {!!birthday && (
                <Birthday>
                    <img src={`img/${birthday.icon}.png`} />
                </Birthday>

            )}
        </Container>
    );
};