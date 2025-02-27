const slidingWindowCounters = {}; // Store counters per IP
const WINDOW_SIZE = 60 * 1000; // 60 seconds
const REQUEST_LIMIT = 60; // Max requests in 60 seconds

const rateLimiter = async (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const currentWindow = Math.floor(now / WINDOW_SIZE);
    const timeInWindow = (now % WINDOW_SIZE) / WINDOW_SIZE; // Fraction of window completed

    if (!slidingWindowCounters[ip]) {
        slidingWindowCounters[ip] = { currentWindow, prevCount: 0, currCount: 0 };
    }

    const userCounter = slidingWindowCounters[ip];

    // If a new window starts, shift counts
    if (userCounter.currentWindow !== currentWindow) {
        userCounter.prevCount = userCounter.currCount;
        userCounter.currCount = 0;
        userCounter.currentWindow = currentWindow;
    }

    // Calculate weighted request count
    const weightedCount = (userCounter.prevCount * (1 - timeInWindow)) + userCounter.currCount;

    if (weightedCount >= REQUEST_LIMIT) {
        return res.status(429).json({ message: "Too Many Requests - Try again later" });
    }

    // Increment current count and allow request
    userCounter.currCount++;
    next();
};

module.exports = { rateLimiter };