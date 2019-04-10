const version = 'v0.01';
const staticCacheName = version + 'staticfiles';

addEventListener('install', installEvent => {
  console.log(`Service worker with cache ${staticCacheName} is installing...`);
  installEvent.waitUntil(
    caches.open(staticCacheName)
    .then( staticCache => {
      return staticCache.addAll([
        'index.html',
        'images/niko-lienata-1183354-unsplash.jpg',
        'js/reveal.js',
        'lib/font/source-sans-pro/source-sans-pro-semibolditalic.woff',
        'css/reveal.css',
        'css/theme/isovera.css',
        'images/throbber.gif',
        'images/network-request.svg',
        'lib/js/head.min.js',
        'lib/font/source-sans-pro/source-sans-pro-semibold.woff',
        'lib/font/source-sans-pro/source-sans-pro.css',
        'images/waiting.png',
        'images/network-request-sw.svg',
      ]);
    })
  );
});

addEventListener('activate', function (event) {
  console.log('The service worker is activated.');
});

addEventListener('fetch', fetchEvent => {
  console.log('The service worker is listening.');
  const request = fetchEvent.request;
  if(request.headers.get('Accept').includes('text/html')) {
    fetchEvent.respondWith(
      fetch(request)
      .then(responseFromFetch => {
        return responseFromFetch;
      })
      .catch(error => {
        return caches.match('/index.html');
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
