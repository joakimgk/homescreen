import dayjs from "dayjs";
import React, { PropsWithChildren, useContext } from "react";
import { CalendarEntry, useHolidays } from "../services/holidayService";

interface HolidayProviderProps {
    isHoliday?: (d: dayjs.Dayjs, full?: boolean) => CalendarEntry | undefined
}

const HolidayContext = React.createContext<HolidayProviderProps>({
});

export const HolidayProvider = ({ isHoliday, children }: PropsWithChildren<HolidayProviderProps>) => {

    const { data: holidaysInternal } = useHolidays();

    const isHolidayLocal = (d: dayjs.Dayjs, full: boolean = false) => {
        const search = full ? holidaysInternal : holidaysInternal?.filter(u => u.description !== 'Sommerferie!');
        return search.find(c => d.add(1, 'hour').isAfter(c.dtstart) && d.add(-1, 'hour').isBefore(c.dtend));
    }

    const value = {
        isHoliday: isHolidayLocal
    }

    return <HolidayContext.Provider value={value}>{children}</HolidayContext.Provider>
}

export function useHolidayContext() {
    return useContext(HolidayContext);
}