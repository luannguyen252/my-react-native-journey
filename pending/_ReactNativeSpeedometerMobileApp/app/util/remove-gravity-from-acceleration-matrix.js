// Not sure why I'm using 0.8, but this guy seemed pretty confident in it ¯\_(ツ)_/¯
// http://blog.contus.com/how-to-measure-acceleration-in-smartphones-using-accelerometer/
const alpha = 0.8;
const gravity = [0, 0, 1];

export const removeGravityFromAccelerationMatrix = accelerationMatrix => {
    gravity[0] = alpha * gravity[0] + (1 - alpha) * accelerationMatrix.x;
    gravity[1] = alpha * gravity[1] + (1 - alpha) * accelerationMatrix.y;
    gravity[2] = alpha * gravity[2] + (1 - alpha) * accelerationMatrix.z;

    const x = Math.round(accelerationMatrix.x - gravity[0]);
    const y = Math.round(accelerationMatrix.y - gravity[1]);
    const z = Math.round(accelerationMatrix.z - gravity[2]);

    return { x, y, z };
};
