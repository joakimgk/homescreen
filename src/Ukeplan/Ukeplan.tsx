import dayjs from "dayjs";
import styled from "styled-components"
import { Link } from "wouter";
import { useHolidayContext } from "../contexts/HolidayContext";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Ukeplan = () => {
    const { isHoliday } = useHolidayContext();

    if (isHoliday && isHoliday(dayjs()), true) return null;

    let planDay = +dayjs().format('d');  // ukedager 1-5 (6-7 er helg)
    if (+dayjs().format('HH') > 16) {
        planDay++;
    }
    if (planDay > 7) {
        planDay = 1;
    }

    return (
        <Container>
            <Link href='ukeplan'>
                {planDay < 6 ? (
                    <img src={`../miniyr/cgi-bin/krohnengen5${planDay}-1.png?${Math.random()}`} />
                ) : <h2>God helg</h2>}
            </Link>

            {/* <a href="#" onClick={() => goTo('/')}>
                <img src={`https://gknudsen.no/miniyr/cgi-bin/uke-1.png?${Math.random()}`} /></a>
            <a href="#" onClick={() => goTo('/')}>
                <img src={`https://gknudsen.no/miniyr/cgi-bin/uke-2.png?${Math.random()}`} /></a> */}
        </Container>
    );
}
