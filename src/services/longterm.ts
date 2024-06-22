export interface Longterm {
    type: string;
    geometry: Geometry;
    properties: Properties;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    meta: Meta;
    timeseries: Timeserie[];
}

export interface Meta {
    updated_at: Date;
    units: Units;
}

export interface Units {
    air_temperature_max: string;
    air_temperature_max_percentile_10: string;
    air_temperature_max_percentile_90: string;
    air_temperature_mean: string;
    air_temperature_mean_percentile_10: string;
    air_temperature_mean_percentile_90: string;
    air_temperature_min: string;
    air_temperature_min_percentile_10: string;
    air_temperature_min_percentile_90: string;
    precipitation_amount: string;
    precipitation_amount_percentile_10: string;
    precipitation_amount_percentile_90: string;
    probability_of_frost: string;
    probability_of_heavy_precipitation: string;
    probability_of_precipitation: string;
}

export interface Timeserie {
    time: Date;
    data: Data;
}

export interface Data {
    next_24_hours: Next24_Hours;
    next_7_days?: Next7_Days;
}

export interface Next24_Hours {
    details: { [key: string]: number };
}

export interface Next7_Days {
    details: Details;
}

export interface Details {
    precipitation_amount: number;
    precipitation_amount_percentile_10: number;
    precipitation_amount_percentile_90: number;
    probability_of_frost: number;
}
