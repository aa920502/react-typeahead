// Utility function: withDebounce
export const withDebounce = (cb, debounceTime) => {
    let timeoutId;
    return (...args) =>
        new Promise((resolve) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(async () => {
                const result = await cb(...args);
                resolve(result);
            }, debounceTime);
        });
};

// Utility function: withRetry
export const withRetry = (cb, retryCount) => {
    let retries = 0;
    return (...args) =>
        new Promise((resolve, reject) => {
            const retry = () => {
                retries++;
                if (retries <= retryCount) {
                    cb(...args)
                        .then(resolve)
                        .catch(retry);
                } else {
                    reject(new Error("Retry limit exceeded"));
                }
            };
            cb(...args)
                .then(resolve)
                .catch(retry);
        });
};


const cache = new Map();
// Utility function: withCache
export const withCache = (cb) => {
    return (...args) =>
        new Promise((resolve) => {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                console.log('Cache hit');
                const cachedValue = cache.get(key);
                console.log(cachedValue);
                if (cachedValue instanceof Promise) {
                    // If the cached value is a Promise, wait for it to resolve
                    cachedValue.then(resolve);
                } else {
                    resolve(cachedValue);
                }
            } else {
                const result = cb(...args);
                cache.set(key, result);
                console.log('Cache miss');
                resolve(result);
            }
        });
};
// Utility function: withLatest
/**
 * The withLatest utility function ensures that only the latest request's response is used,
 * discarding any previous responses that might arrive out of order due to the asynchronous nature of the requests.
 */
export const withLatest = (cb) => {
    let lastCallId = 0;
    return (...args) =>
        new Promise((resolve) => {
            lastCallId++;
            const callId = lastCallId;
            cb(...args).then((result) => {
                if (callId === lastCallId) {
                    resolve(result);
                }
            });
        });
};