'use client';

import { onLCP, onFID, onCLS, onINP, onTTFB, type Metric } from 'web-vitals';

type WebVitalPayload = Pick<Metric, 'name' | 'value' | 'id'>;

declare global {
  interface Window {
    gtag?: (type: 'event', eventName: string, params?: Record<string, unknown>) => void;
  }
}

function sendToGA({ name, value, id }: WebVitalPayload) {
  // GA4 event name: web_vital_<metric>
  const eventName = `web_vital_${name.toLowerCase()}`;
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      value,
      metric_id: id,
      non_interaction: true,
    });
  }
}

export default function WebVitals() {
  // Respect reduced data environments if needed
  if (typeof window !== 'undefined') {
    onLCP(sendToGA);
    onFID(sendToGA);
    onCLS(sendToGA);
    // INP is replacing FID
    onINP(sendToGA);
    onTTFB(sendToGA);
  }
  return null;
}
