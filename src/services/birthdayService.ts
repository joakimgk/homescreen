import useSWR from "swr";
import { useAuthContext } from "../contexts/AuthContext";
import { authFetcher } from "../App";

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
    const { data, error } = useSWR<BirthdayArray>(credentials ? [url, credentials] : null, () => authFetcher(url, {}, credentials));

    return {
        data: data?.bursdager,
        error
    };
};
