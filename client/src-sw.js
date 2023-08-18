//Here, we "require" (import) various modules to help with the functionality of "cache"ing data that the app receives, in order to retrieve it when the app is being used "offline."
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

//Here, "precache" assets specified in the WorkBox ("WB") "MANIFEST" and provide routes for static assets, making them available on page-load via the "warmStrategyCache" function. We also establish "statuses" to indicate if the "cache"ing was successful and provide an "Expiration" "maxAge" in "seconds" for this "Plugin" (30 days x 24 hours x 60 min x 60 seconds).
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

//Here, we allow the app to "navigate" to a new "page", if the "Cache" is available.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//Here, we register a route for asset requests "style" (stylesheets), "script" (various scripts), and (service) "workers". Utilizing the "StaleWhileRevalidate" strategy, it serves assets from the cache while revalidating them in the background. Assets are stored in the "asset-cache". The "CacheableResponsePlugin" contains status codes, similar to its functionality within the "preCacheAndRoute" shown above.
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
