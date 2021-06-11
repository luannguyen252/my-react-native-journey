export const formatGeolocationSuccessResponse = response => {
    const { coords, timestamp } = response;
    const { accuracy, heading, speed, latitude, longitude } = coords;
    const currentPosition = { latitude, longitude };

    const result = {
        accuracy,
        currentPosition,
        heading,
        speed: speed < 0 ? 0 : speed,
        timestamp
    };

    return result;
};
