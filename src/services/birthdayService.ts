import useSWR from "swr";
import { BasicCredentials, useAuthContext } from "../contexts/AuthContext";
import { fetcher2, textFetcher } from "../App";

export interface Birthday {
    navn: string;
    dato: string;
    icon: string;
}

export interface BirthdayArray {
    bursdager: Birthday[];
}


export const useBirthdays = () => {

    const url = process.env.REACT_APP_BIRTHDAYS_URL || '';
    const { credentials } = useAuthContext();
    const { data, error } = useSWR<BirthdayArray>(credentials ? [url, credentials] : null, () => fetcher2(url, {}, credentials));

    if (!credentials) {
        console.log('bitas');
    }

    return {
        data: data?.bursdager,
        error
    };
};
