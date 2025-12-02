import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// CLEAN OLD CACHES
cleanupOutdatedCaches();

// JSON MANIFEST -- VERSION + FILES NAMES
const MANIFEST_URL = '/api/pos/sales/filmanifest'; // Adjust the URL as needed
let currentVersion = null; // version from manifest

// IMAGES AND VIDEOS CACHE
registerRoute(
  ({ url }) => url.pathname.startsWith('/csp/api/cusfil/'), //al route with start with /erc/media/
  new CacheFirst({
    cacheName: 'media-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }), //sucessful responses are cached only
      new ExpirationPlugin({
        maxEntries: 50, // maximum number of items in cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        maxSizeBytes: 500 * 1024 * 1024, // maximum size of 500MB
        purgeOnQuotaError: true, // automatically cleanup if quota is exceeded
      }),
    ],
  })
);

// MANIFEST CACHING AND VERSIONING
registerRoute(
  MANIFEST_URL,
  new StaleWhileRevalidate({
    cacheName: 'manifest-cache',
  })
);

// UPDATE LOGIC BASED ON MANIFEST VERSION
// we listen for messages from the main thread (the PWA send the message) to trigger version checks
self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'CHECK_VERSION') {
    try {
      const response = await fetch(MANIFEST_URL);
      const data = await response.json();

      if (currentVersion && data.version !== currentVersion) {
        // Version has changed, trigger update logic
        const cache = await caches.open('manifest-cache');
        // Clear the manifest cache to force re-fetching
        await cache
          .keys()
          .then((reques) =>
            Promise.all(reques.map((request) => cache.delete(request)))
          );

        // OTPIONAL: the manifest version changed, we can also clear other caches if needed
        await caches.delete('manifest-cache');

        // Notify the main thread about the update (message to PWA)
        // this uses the port that we pass in swCustViewFileUpdate
        event.ports[0].postMessage({
          updateAvailable: true,
          result: data,
        });
      } else {
        // No version change
        event.ports[0].postMessage({ updateAvailable: false });
      }
      currentVersion = data.version; // update current version
    } catch (error) {
      event.ports[0].postMessage({ error: true, error: error.message });
      return;
    }
  }
});

// INSTALL EVENT TO SET INITIAL VERSION
self.addEventListener('install', async (event) => {
  try {
    const res = await fetch(MANIFEST_URL);
    const data = await res.json();
    currentVersion = data.version; // set the current version on install
  } catch (err) {
    console.error('Service Worker installation failed:', err);
  }
  // Activate worker immediately
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  clients.claim();
});
