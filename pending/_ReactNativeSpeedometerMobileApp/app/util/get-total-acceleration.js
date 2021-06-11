export const getTotalAcceleration = accelerationVector => {
    const { x, y, z } = accelerationVector;
    const result = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

    return result;
};
