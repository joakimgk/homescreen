import dayjs from "dayjs";
import useSWR from "swr";

const textFetcher = (url: string) => fetch(url).then(res => res.text());

export interface CalendarEntry {
    dtstamp: string;
    dtstart: string;
    dtend: string;
    uid: string;
    summary?: string;
    description?: string;
}

// Type guard to check if an object is of type CalendarEntry
const isCalendarEntry = (obj: any): obj is CalendarEntry => {
    return (
        typeof obj.dtstamp === 'string' &&
        typeof obj.dtstart === 'string' &&
        typeof obj.dtend === 'string' &&
        typeof obj.uid === 'string'
    );
};

export const useHolidays = () => {

    const url = process.env.REACT_APP_CALENDAR_URL;

    const { data } = useSWR(url, textFetcher);

    const convert = (val: string, type?: string) => {
        const key = type?.split('=')[0];
        switch (key) {
            case "DATE":
                return dayjs(val, 'YYYYMMDD').format('YYYY-MM-DD');
            default:
                return val;
        };
    }

    const parseICal = (data?: string): CalendarEntry[] => {
        if (!data) return [];
        const events = data.split('BEGIN:VEVENT\r\n');
        const cal: any[] = [];

        events.forEach(event => {
            if (!event.trim()) return; // Skip empty entries

            const lines = event.split('\r\n');
            const obj: Partial<CalendarEntry> = {};

            lines.forEach(line => {
                if (!line.trim() || line === 'END:VEVENT') return; // Skip empty lines

                const value = line.split(':');
                const field = value[0].split(';'); // Get the field name
                const key = field[0].toLowerCase() as keyof CalendarEntry;

                obj[key] = value[1];  //convert(value[1], field[1]);
            });

            if (isCalendarEntry(obj)) {
                cal.push(obj);
            }
        });

        return cal;
    };

    return {
        data: parseICal(data)
    };
};
