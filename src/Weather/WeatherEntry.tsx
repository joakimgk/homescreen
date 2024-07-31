import dayjs from "dayjs";
import { ModifierKeyz, icons, modifiers } from "../services/icons";
import styled, { css } from "styled-components";
import { Timeserie, Next1_HoursDetails } from "../services/weather";
import { pad, padD } from "../utils/helpers";
import { usePrecipitationTrendContext } from "../contexts/PrecipitationTrendContext";
import { Clock } from "./Clock";
import { Location } from "./locations";

const Container = styled.div<{ showMinutes?: number }>`
    display: flex;
    justify-content: space-between; 
    padding: 0 15px;
    
    /* define base font size */
    font-size: ${props => props.showMinutes === 1 ? '1.8em' : '1em'};
    font-weight: ${props => props.showMinutes === 1 ? '700' : '400'};

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        font-size: ${props => props.showMinutes === 1 ? '2em' : '1.3em'};
    }
`;

const Time = styled.div`
    display: flex;
    align-items: center;
    font-size: 70%;
    flex: 1;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    img {
        height: 1.3em;
        @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
            height: 1.5em;
        }
    }
`;

const Temperature = styled.div`
    display: flex;
    font-size: 70%;
    align-items: center;
    flex: 1;
`;

const Wind = styled.div`
    display: flex;
    font-size: 50%;
    align-items: center;
    flex: 1;
`;

const Precipitation = styled.div`
    display: flex;
    align-items: center;
    font-size: 50%;
    flex: 1.6;

    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        flex: 2;
    }
`;

const History = styled.div`
    display: inline;
    font-size: 70%;
    padding: 0 1em;
`;

const RainIndicator = styled.div<{ color: string, amount?: number, border?: number }>`
    display: flex;
    background-color: #${props => props.color};
    width: ${props => (props.amount ? props.amount : 0) / 15.0 * 80.0}%;
    ${props => props.border === 1 && css`
        border-left: 1px solid lightblue;
    `};
    height: 16px;
`;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    padding-left: 1em;
`;

const RainBar = ({ prev, rain }: { prev: number, rain?: number, }) => {
    if (rain == undefined) return null;
    return (
        <Wrapper>
            {prev < rain ? (
                <>
                    <RainIndicator amount={prev} color="007FFF" />
                    <RainIndicator amount={rain - prev} color="007FFF" border={1} />
                </>
            ) : (
                <>
                    <RainIndicator amount={rain} color="007FFF" />
                    <RainIndicator amount={prev - rain} color="AAFFFF" />
                </>
            )}
        </Wrapper>
    )
}


export const WeatherEntry = ({ location, weather, isPrimary }: { location: Location, weather: Timeserie, isPrimary?: boolean }) => {
    const forecast = weather.data.next_1_hours || weather.data.next_6_hours || weather.data.next_12_hours;
    const { getTrend, getSeries } = usePrecipitationTrendContext();

    if (!forecast) return null;

    const key = forecast.summary.symbol_code.split('_');
    const k = key[1] as ModifierKeyz;
    let icon = pad(icons[key[0]].id);
    if (key.length > 1) icon += modifiers[k];

    const date = dayjs(weather.time, 'YYYY-MM-DD', 'no');
    const showMinutes = isPrimary && dayjs().format('DD HH') === date.format('DD HH');

    const rainMM = (forecast.details as Next1_HoursDetails).precipitation_amount;

    const trend = getTrend(location.key, date);
    const series = getSeries(location.key, date);

    const show = rainMM > 0 || series?.some(x => x > 0);  // will rain, or has been said to rain

    const uniqueData = series.filter((value, index) => {
        // Keep the first occurrence of each value by checking if it appears for the first time at the current index
        return series.indexOf(value) === index;
    });
    const prevValue = uniqueData.length > 1 ? uniqueData[uniqueData.length - 2] : undefined;

    const toArrow = (val: number) => {
        return val > 0 ? '↗' : '↘';
    };

    return (
        <Container showMinutes={showMinutes ? 1 : 0}>
            <Time>
                {showMinutes ? <Clock /> : <>{date.format('HH')}</>}
            </Time>
            <Icon>
                <img src={`img/100/${icon}.png`} />
            </Icon>
            <Temperature>{Math.round(weather.data.instant.details.air_temperature)}&deg;</Temperature>
            <Precipitation>
                {show && (
                    <>{`${padD(rainMM)} mm`}
                        <RainBar rain={rainMM} prev={prevValue ?? 0} />

                        {/* <History>t: {trend} (d: {series ? series.length : '-'})</History> */}
                        {trend != 0 && trend != undefined && toArrow(trend)}
                        {/* <History>({prevValue ?? 0} mm)</History> */}
                    </>
                )}
            </Precipitation>
            <Wind>{weather.data.instant.details.wind_speed} m/s</Wind>
        </Container>
    );
}