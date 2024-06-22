import styled from "styled-components";
import { UkeplanFull } from "../Ukeplan/UkeplanFull";

const Content = styled.div`
  display: flex;
`;
const UkeplanContainer = styled.div`
  flex: 1;
  background: lightgreen; /* Adjust to your needs */
`;

export const UkeplanPage = () => (
    <Content>
        <UkeplanContainer>
            <UkeplanFull />
        </UkeplanContainer>
    </Content>
);