export type ModifierKeyz = 'day' | 'night' | 'polar';

export type Modifiers = {
    [key in ModifierKeyz]: string;
};

export const modifiers = {
    day: "d",
    night: "n",
    polar: "m"  // TODO
};

export interface Icons {
    [key: string]: Icon;
}

export interface Icon {
    id: number;
    description: string;
}

export const icons: Icons = {
    "clearsky": {
        id: 1,
        description: "Clear sky"
    },
    "cloudy": {
        id: 4,
        description: "Cloudy"
    },
    "fair": {
        id: 2,
        description: "Fair"
    },
    "fog": {
        id: 15,
        description: "Fog"
    },
    "heavyrain": {
        id: 10,
        description: "Heavy rain"
    },
    "heavyrainandthunder": {
        id: 11,
        description: "Heavy rain and thunder"
    },
    "heavyrainshowers": {
        id: 41,
        description: "Heavy rain showers"
    },
    "heavyrainshowersandthunder": {
        id: 25,
        description: "Heavy rain showers and thunder"
    },
    "heavysleet": {
        id: 48,
        description: "Heavy sleet"
    },
    "heavysleetandthunder": {
        id: 32,
        description: "Heavy sleet and thunder"
    },
    "heavysleetshowers": {
        id: 43,
        description: "Heavy sleet showers"
    },
    "heavysleetshowersandthunder": {
        id: 27,
        description: "Heavy sleet showers and thunder"
    },
    "heavysnow": {
        id: 50,
        description: "Heavy snow"
    },
    "heavysnowandthunder": {
        id: 34,
        description: "Heavy snow and thunder"
    },
    "heavysnowshowers": {
        id: 45,
        description: "Heavy snow showers"
    },
    "heavysnowshowersandthunder": {
        id: 29,
        description: "Heavy snow showers and thunder"
    },
    "lightrain": {
        id: 46,
        description: "Light rain"
    },
    "lightrainandthunder": {
        id: 30,
        description: "Light rain and thunder"
    },
    "lightrainshowers": {
        id: 40,
        description: "Light rain showers"
    },
    "lightrainshowersandthunder": {
        id: 24,
        description: "Light rain showers and thunder"
    },
    "lightsleet": {
        id: 47,
        description: "Light sleet"
    },
    "lightsleetandthunder": {
        id: 31,
        description: "Light sleet and thunder"
    },
    "lightsleetshowers": {
        id: 42,
        description: "Light sleet showers"
    },
    "lightsnow": {
        id: 49,
        description: "Light snow"
    },
    "lightsnowandthunder": {
        id: 33,
        description: "Light snow and thunder"
    },
    "lightsnowshowers": {
        id: 44,
        description: "Light snow showers"
    },
    "lightssleetshowersandthunder": {
        id: 26,
        description: "Light sleet showers and thunder"
    },
    "lightssnowshowersandthunder": {
        id: 28,
        description: "Light snow showers and thunder"
    },
    "partlycloudy": {
        id: 3,
        description: "Partly cloudy"
    },
    "rain": {
        id: 9,
        description: "Rain"
    },
    "rainandthunder": {
        id: 22,
        description: "Rain and thunder"
    },
    "rainshowers": {
        id: 5,
        description: "Rain showers"
    },
    "rainshowersandthunder": {
        id: 6,
        description: "Rain showers and thunder"
    },
    "sleet": {
        id: 12,
        description: "Sleet"
    },
    "sleetandthunder": {
        id: 23,
        description: "Sleet and thunder"
    },
    "sleetshowers": {
        id: 7,
        description: "Sleet showers"
    },
    "sleetshowersandthunder": {
        id: 20,
        description: "Sleet showers and thunder"
    },
    "snow": {
        id: 13,
        description: "Snow"
    },
    "snowandthunder": {
        id: 14,
        description: "Snow and thunder"
    },
    "snowshowers": {
        id: 8,
        description: "Snow showers"
    },
    "snowshowersandthunder": {
        id: 21,
        description: "Snow showers and thunder"
    }
};
