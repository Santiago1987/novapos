import { type SWFileResponse } from '@/types/miscStore';

const swCustViewFileUpdate = async (): Promise<SWFileResponse | null> => {
  if (!('serviceWorker' in navigator) || !navigator.serviceWorker.controller) {
    return new Promise((resolve) => resolve(null));
  }

  return new Promise((resolve) => {
    // MessageChannel is bidirectional
    const channel = new MessageChannel();

    // the communication use port1 and port2
    // the message is sent by using port1
    channel.port1.onmessage = (ev: MessageEvent) => {
      const response = ev.data as SWFileResponse;
      resolve(response);
    };

    // postMessage is unidirectional
    // the pwa sends this message "CHECK_VERSION"
    navigator.serviceWorker.controller?.postMessage({ type: 'CHECK_VERSION' }, [
      channel.port2, // the response is on port2
    ]);
  });
};

export default swCustViewFileUpdate;
