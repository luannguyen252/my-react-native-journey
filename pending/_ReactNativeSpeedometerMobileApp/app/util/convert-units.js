export const convertMetersPerSecondToKilometersPerHour = meters => {
    return meters * 3.6;
};

export const convertMetersPerSecondToMilesPerHour = meters => {
    const milesPerSecond = meters * 0.000621371;
    const milesPerHour = milesPerSecond * 3600;

    return milesPerHour;
};

export const convertMetersToKilometers = meters => {
    return meters * 0.001;
};

export const convertMetersToMiles = meters => {
    return meters * 0.000621371;
};
