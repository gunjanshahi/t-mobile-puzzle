const Wreck = require('@hapi/wreck');

const getPriceQueryResponse = async function (params) {
    const [symbol, period, queryParam] = params.split(':');
    const url = `https://sandbox.iexapis.com/beta/stock/${symbol}/chart/${period}${queryParam}`
    const { res, payload } = await Wreck.get(url);
    return payload;
};

export const priceCachePlugin = {
    name: 'priceCachePlugin',
    version: '1.0.0',
    register: async function (server, options) {

        const priceCache = server.cache({
            expiresIn: 20 * 1000,
            segment: "priceSegment",
            generateFunc: async id => {
                return await getPriceQueryResponse(id).then(val => val.toString())
            },
            generateTimeout: 11000
        });

        server.route({
            method: 'GET',
            path: '/beta/stock/{symbol}/chart/{period}',

            handler: async function (request, h) {
                const queryParam = request.url.search;
                const { symbol, period } = request.params;
                const id = `${symbol}:${period}:${queryParam}`;
                return await priceCache.get(id)
            },
            config: {
                cache: {
                    expiresIn: 10 * 1000
                }
            }
        });
    }
};