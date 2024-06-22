import useSWR from "swr";
import { Weather } from "./weather";
import { Longterm } from "./longterm";

export const useWeather = () => {

    const url = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.39323&lon=5.3245&altitude=5';

    const { data } = useSWR<Weather>(url);

    return {
        data
    };
};

export const useLongterm = () => {

    const url = 'https://api.met.no/weatherapi/subseasonal/1.0/complete?lat=60.39323&lon=5.3245&altitude=5';

    const { data } = useSWR<Longterm>(url);


    return {
        data
    };
};