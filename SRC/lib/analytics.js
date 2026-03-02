const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

function getGtag() {
  if (typeof window === 'undefined') {
    return null;
  }

  return typeof window.gtag === 'function' ? window.gtag : null;
}

export const analytics = {
  track(eventName, params = {}) {
    const gtag = getGtag();

    if (!gtag) {
      return;
    }

    const payload = {
      ...params,
    };

    if (measurementId) {
      payload.send_to = measurementId;
    }

    gtag('event', eventName, payload);
  },
};

// To activate GA4 later, load gtag normally and define VITE_GA_MEASUREMENT_ID in .env.
