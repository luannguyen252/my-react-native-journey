export const formatSecondsToTime = seconds => {
    return Math.floor(seconds / 60) + ' ' + ('0' + seconds % 60).slice(-2);
};
