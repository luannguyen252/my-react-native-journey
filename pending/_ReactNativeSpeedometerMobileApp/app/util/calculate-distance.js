import haversine from 'haversine';

export const calculateDistance = (startPosition, endPosition) => {
    if (startPosition.latitude === undefined
            || startPosition.longitude === undefined
            || endPosition.latitude === undefined
            || endPosition.longitude === undefined) return 0;

    return haversine(startPosition, endPosition, { unit: 'meter' });
};
