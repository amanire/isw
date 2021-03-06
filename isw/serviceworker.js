const version = 'v1.08';
const staticCacheName = version + 'staticfiles';

addEventListener('install', installEvent => {
  console.log(`Service worker with cache ${staticCacheName} is installing...`);
  installEvent.waitUntil(
    caches.open(staticCacheName)
    .then( staticCache => {
      return staticCache.addAll([
        'index.html',
        'js/reveal.js',
        'lib/font/source-sans-pro/source-sans-pro-semibolditalic.woff',
        'lib/font/source-sans-pro/source-sans-pro-semibold.woff',
        'lib/font/source-sans-pro/source-sans-pro.css',
        'lib/js/head.min.js',
        'css/reveal.css',
        'css/theme/isovera.css',
        'images/isovera_logo_reverse.svg',
        'images/niko-lienata-1183354-unsplash.jpg',
        'images/google-chrome-pages-unresponsive.png',
        'images/throbber.gif',
        'images/network-request.svg',
        'images/network-request-sw.svg',
        'fetch-api.html',
        'images/waiting.png',
        'images/letsencrypt-logo-horizontal.svg',
        'images/certbot-logo-1A.svg',
        'images/pwa-lighthouse.png'
      ]);
    })
  );
});

addEventListener('activate', function (activateEvent) {
  activateEvent.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map( cacheNameKey => {
          if (cacheNameKey != staticCacheName) {
            return caches.delete(cacheNameKey);
          }
        })
      );
    })
  );
});

addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request;
  if(request.headers.get('Accept').includes('text/html')) {
    fetchEvent.respondWith(
      fetch(request)
      .then(responseFromFetch => {
        return responseFromFetch;
      })
      .catch(error => {
        return caches.match('index.html');
        })
    );
    return;
  }
  // for everything besides HTML
  fetchEvent.respondWith(
    caches.match(request)
    .then(responseFromCache => {
      if(responseFromCache) {
        return responseFromCache;
      }
      return fetch(request);
    })
  )
});
