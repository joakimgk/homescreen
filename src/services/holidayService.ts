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

        // må lages separat
        const sommerferie: Partial<CalendarEntry> = {
            description: 'Sommerferie!',
            dtstart: '2024-06-21',
            dtend: '2024-08-18'
        };

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

            /*
            if (obj.summary === 'Skolestart') {
                const a = obj.dtstart as dayjs.Dayjs;
                const b = sommerferie.dtend as dayjs.Dayjs;
                if (!b || b.isAfter(a)) {
                    sommerferie.dtend = a;
                }
            }
            if (obj.summary === 'Skoleslutt') {
                const a = obj.dtstart as dayjs.Dayjs;
                const b = sommerferie.dtstart as dayjs.Dayjs;
                if (!b || b.isAfter(a)) {
                    sommerferie.dtstart = a;
                }
            }
            */

            if (isCalendarEntry(obj)) {
                cal.push(obj);
            } else {
                console.log('INVALID', obj);
            }
        });

        if (sommerferie.dtstart && sommerferie.dtend) {
            cal.push(sommerferie);
        }

        return cal;
    };

    return {
        data: parseICal(data)
    };
};
