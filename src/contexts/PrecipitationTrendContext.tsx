import dayjs from "dayjs";
import React, { PropsWithChildren, useContext } from "react";
import { Next12_Hours, Next1_HoursDetails, NextHours, Timeserie } from "../services/weather";
import { pad } from "../utils/helpers";
import { slopeAndIntercept } from "../utils/trendline";
import { compute } from "../utils/poisson";

interface Trend {
    values: number[];
    trend?: number;
}

interface PrecipitationSeries {
    [key: string]: Trend;
}

interface PrecipitationData {
    [location: string]: PrecipitationSeries; // supports multiple locations (key is location)
}

interface PrecipitationTrendProviderProps {
    registerSeries: (location: string, data?: Timeserie[]) => void;
    getSeries: (location: string, d: dayjs.Dayjs) => number[];
    getValue: (location: string, d: dayjs.Dayjs) => number | undefined;
    getTrend: (location: string, d: dayjs.Dayjs) => number | undefined;
}

const PrecipitationTrendContext = React.createContext<PrecipitationTrendProviderProps>({
    registerSeries: () => { },  // no-op function
    getSeries: () => [],
    getValue: () => 0,
    getTrend: () => 0
});

function isNextHours(forecast: Next12_Hours | NextHours | undefined): forecast is NextHours {
    return (forecast as NextHours)?.details !== undefined && 'precipitation_amount' in (forecast as NextHours).details;
}

// no props here -- just `children`
export const PrecipitationTrendProvider = ({ children }: PropsWithChildren<{}>) => {

    const data: PrecipitationData = {};

    const cleanOldData = (location: string) => {
        const series = data[location];
        if (!series) return;

        const currentDate = dayjs();

        // Extract the keys and sort them
        const keys = Object.keys(series).sort();

        for (const key of keys) {
            const datePart = key.split('@')[0]; // Extract date part from the key
            const keyDate = dayjs(datePart, 'YYYYMMDD');
            if (keyDate.isBefore(currentDate, 'day')) {
                delete series[key]; // Delete key if it is before the current date
            } else {
                break; // Stop iterating as soon as a non-expired key is found
            }
        }
    }

    const computeTrends = (location: string) => {
        const series = data[location];
        if (!series) return;

        const keys = Object.keys(series);
        const high = 0.975;
        const low = 1 - high;

        // analyze trend
        for (let i = 0; i < keys.length; i++) {

            // // remove outdated data points
            // if (isOutdated(keys[i])) {
            //     delete series[keys[i]];
            //     continue;
            // }

            const ser = series[keys[i]].values;
            const slope = slopeAndIntercept(ser);

            let sum = 0;
            for (let j = 0; j < ser.length; j++) {
                sum += ser[j];
            }
            var avg = sum / ser.length;
            if (avg > 0) {
                var percentile = compute(ser[ser.length - 1], avg);

                series[keys[i]].trend = 0;
                if (percentile > high) series[keys[i]].trend = 1;
                else if (percentile < low) series[keys[i]].trend = -1;

                //console.log(keys[i], ser);
                //console.log(keys[i], slope);
                //console.log(keys[i], percentile + ' -> ' + series[keys[i]].trend);
            }
        }
    }

    const dateToKey = (d: dayjs.Dayjs): string =>
        `${d.year()}${pad(d.month() + 1)}${pad(d.date())}@${pad(d.hour())}`;

    const getTrend = (location: string, d: dayjs.Dayjs): number | undefined => {
        const series = data[location];
        if (!series) return undefined;
        const key = dateToKey(d);
        return series[key]?.trend || 0;
    };

    const getSeries = (location: string, d: dayjs.Dayjs): number[] => {
        const series = data[location];
        if (!series) return [];
        const key = dateToKey(d);
        if (!series[key]) return [];
        return series[key].values;
    };

    const getValue = (location: string, d: dayjs.Dayjs): number | undefined => {
        const series = data[location];
        if (!series) return undefined;
        const key = dateToKey(d);
        if (!series[key]) return undefined;
        const entry = series[key].values;
        return entry[entry.length - 1];
    };

    const registerSeries = (location: string, wdata?: Timeserie[]) => {
        const series = data[location] || {};

        cleanOldData(location);

        wdata?.forEach(weather => {
            const forecast = weather.data.next_1_hours || weather.data.next_6_hours || weather.data.next_12_hours;
            const hasPrecipitation = isNextHours(forecast);
            if (hasPrecipitation) {
                const d = dayjs(weather.time);
                // trend (one data point every 5 minutes)
                const seriesKey = dateToKey(d);
                //`${d.year()}${pad(d.month() + 1)}${pad(d.date())}@${pad(d.hour())}`;

                if (!series[seriesKey]) {
                    // init new series (new hour)
                    series[seriesKey] = {
                        values: []
                    };
                }

                //const rainMM = hasPrecipitation ? (forecast.details as Next1_HoursDetails).precipitation_amount : 0;
                const rainMM = (forecast.details as Next1_HoursDetails).precipitation_amount;
                series[seriesKey].values.push(rainMM);  // begynner med kun nedbør mm
            }
        });
        data[location] = series;

        computeTrends(location);
    }

    const value = {
        registerSeries,
        getSeries,
        getValue,
        getTrend
    }

    return (
        <PrecipitationTrendContext.Provider value={value}>
            {children}
        </PrecipitationTrendContext.Provider>
    );
}

export function usePrecipitationTrendContext() {
    return useContext(PrecipitationTrendContext);
}