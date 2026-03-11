const API_BASE_URL = process.env.REACT_APP_APIURL;

function getApiOrigin() {
  if (!API_BASE_URL) return '';
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return '';
  }
}

/**
 * Convert API-provided file paths to browser-loadable URLs.
 *
 * Backend commonly returns paths like:
 * - "/uploads/..."
 * - absolute "http(s)://..."
 *
 * In Electron (file://) and in dev (React on a different port),
 * "/uploads/..." must be prefixed with the API origin.
 */
export function toAbsoluteFileUrl(value) {
  if (!value) return null;
  const str = String(value);

  if (
    str.startsWith('http://') ||
    str.startsWith('https://') ||
    str.startsWith('data:') ||
    str.startsWith('blob:')
  ) {
    return str;
  }

  const origin = getApiOrigin();
  if (origin && str.startsWith('/uploads/')) {
    return `${origin}${str}`;
  }

  return str;
}

export function normalizeFileUrlList(input) {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.map(toAbsoluteFileUrl).filter(Boolean);
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) return [];

    // Backward compatibility: DB used to store JSON stringified arrays
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return normalizeFileUrlList(parsed);
      } catch {
        return [];
      }
    }

    return [toAbsoluteFileUrl(trimmed)].filter(Boolean);
  }

  return [];
}

