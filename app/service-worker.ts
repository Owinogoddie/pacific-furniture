// app/service-worker.ts
export function register() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('service worker installed'))
        .catch((err) => console.error('Error', err));
    }
  }