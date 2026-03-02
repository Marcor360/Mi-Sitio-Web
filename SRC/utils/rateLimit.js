const STORAGE_KEY = 'contact-rate-limit-v1';
const LIMIT = 2;
const WINDOW_MS = 60 * 1000;

function getTimestamps() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((value) => Number.isFinite(value)) : [];
  } catch (error) {
    return [];
  }
}

function setTimestamps(values) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch (error) {
    // Ignore storage issues and fall back to no persistence.
  }
}

export function consumeContactSend() {
  const now = Date.now();
  const recent = getTimestamps().filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= LIMIT) {
    const retryAt = recent[0] + WINDOW_MS;
    return {
      allowed: false,
      retryAfterMs: Math.max(0, retryAt - now),
    };
  }

  const next = [...recent, now];
  setTimestamps(next);

  return {
    allowed: true,
    retryAfterMs: 0,
  };
}
