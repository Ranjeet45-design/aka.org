/**
 * Best-effort in-memory limiter. On serverless hosts (Vercel) each instance has its own memory, so this
 * slows bursts but is NOT a global guarantee. For a hard limit swap `hit()` for a shared store
 * (Upstash Redis / Vercel KV) or enable Vercel WAF rate limiting on /api/contact.
 */
const buckets = new Map<string, number[]>();

export function hit(key: string, max: number, windowMs: number): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    buckets.set(key, recent);
    return { allowed: false, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return { allowed: true, retryAfter: 0 };
}

/** Remembers recent submission fingerprints to reject double-clicks / replays. */
const seen = new Map<string, number>();

export function isDuplicate(fingerprint: string, windowMs: number): boolean {
  const now = Date.now();
  for (const [k, t] of seen) if (now - t > windowMs) seen.delete(k);
  if (seen.has(fingerprint)) return true;
  seen.set(fingerprint, now);
  return false;
}
