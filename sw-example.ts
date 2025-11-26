// 1. src/service-worker-registration.ts (una sola vez)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

// ON MAIN
import './service-worker-registration';

// new function
export async function checkForMediaUpdates(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
    return false;
  }

  return new Promise((resolve) => {
    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => {
      if (event.data.updateAvailable) {
        // Hay contenido nuevo → recargamos
        window.location.reload();
      } else {
        resolve(false);
      }
    };

    navigator.serviceWorker.controller.postMessage({ type: 'CHECK_VERSION' }, [
      channel.port2,
    ]);
  });
}

// en algun lado
import { checkForMediaUpdates } from './checkMediaUpdates';
useEffect(() => {
  setInterval(checkForMediaUpdates, 10 * 60 * 1000);
  checkForMediaUpdates();
}, []);
