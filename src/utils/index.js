
const pino = require("pino");

const transport = pino.transport({
    target: 'pino-pretty',
});
const logger = pino(
    {
        level: 'info',
        redact: ['poolKeys'],
        serializers: {
            error: pino.stdSerializers.err,
        },
        base: undefined,
    },
    transport,
);

const formatAddress = (address, before, after) => address &&
    `${address.substring(0, before || 4)}.....${address.substring(address.length - after || 6)}`;

async function sleep(millis) {
    const second = Number(millis) * 1000;
    return new Promise((resolve) => setTimeout(resolve, second));
}

function randomIntFromInterval(min, max) {
    const random = (Math.random() * (max - min) + min).toFixed(4);
    return random;
}

module.exports = {
    formatAddress,
    transport,
    logger,
    sleep,
    randomIntFromInterval
};