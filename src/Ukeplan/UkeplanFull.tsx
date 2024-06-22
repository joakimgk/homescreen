import styled from "styled-components"
import { Link } from "wouter";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const UkeplanFull = () => (
    <Container>
        <Link href='/'>
            <img src={`../miniyr/cgi-bin/uke-1.png?${Math.random()}`} />
        </Link>
        {/* <a href="#" onClick={() => goTo('/')}>
            <img src={`https://gknudsen.no/miniyr/cgi-bin/uke-2.png?${Math.random()}`} /></a> */}
    </Container>
);
