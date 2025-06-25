
import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const usePersistentFingerprint = () => {
  const [visitorId, setVisitorId] = useState(null);

  useEffect(() => {
    const obtenerId = async () => {
      let persistente = localStorage.getItem('fpId');
      if (persistente) {
        setVisitorId(persistente);
        return;
      }

      const fp = await FingerprintJS.load();
      const result = await fp.get();
      localStorage.setItem('fpId', result.visitorId);
      setVisitorId(result.visitorId);
    };

    obtenerId();
  }, []);

  return visitorId;
};

export default usePersistentFingerprint;
