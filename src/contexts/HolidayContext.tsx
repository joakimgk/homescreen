import dayjs from "dayjs";
import React, { PropsWithChildren, useContext } from "react";
import { CalendarEntry, useHolidays } from "../services/holidayService";
import { Birthday, useBirthdays } from "../services/birthdayService";

interface HolidayProviderProps {
    isHoliday?: (d: dayjs.Dayjs, full?: boolean) => CalendarEntry | undefined,
    isBirthday?: (d: dayjs.Dayjs, full?: boolean) => Birthday | undefined | null
}

const HolidayContext = React.createContext<HolidayProviderProps>({
});

export const HolidayProvider = ({ isHoliday, isBirthday, children }: PropsWithChildren<HolidayProviderProps>) => {

    const { data: holidaysInternal } = useHolidays();
    const { data: birthdaysInternal } = useBirthdays();

    const isHolidayLocal = (d: dayjs.Dayjs, full: boolean = false) => {
        const search = full ? holidaysInternal : holidaysInternal?.filter(u => u.description !== 'Sommerferie!');
        return search.find(c => d.add(1, 'hour').isAfter(c.dtstart) && d.add(-1, 'hour').isBefore(c.dtend));
    }

    const isBirthdayLocal = (d: dayjs.Dayjs): Birthday | undefined => {

        const currentMonth = d.month();
        const currentDay = d.date();

        return birthdaysInternal?.find(c => {
            const givenDate = dayjs(c.dato, 'YYYY-MM-DD');
            const givenMonth = givenDate.month(); // month is 0-indexed in dayjs
            const givenDay = givenDate.date();
            return givenMonth === currentMonth && givenDay === currentDay ? c : undefined;
        });
    }

    const value = {
        isHoliday: isHolidayLocal,
        isBirthday: isBirthdayLocal
    }

    return <HolidayContext.Provider value={value}>{children}</HolidayContext.Provider>
}

export function useHolidayContext() {
    return useContext(HolidayContext);
}