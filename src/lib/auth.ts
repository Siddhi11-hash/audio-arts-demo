// Demo-only access gate for the client/admin portal routes.
// This is NOT production authentication — see README "Security limitations".
// It exists purely so the sales demo can't be bypassed by typing /admin
// directly into the address bar; it uses sessionStorage so it clears when
// the tab closes and is never persisted or sent anywhere.
const KEY = 'audioArtsDemoSession';

export function isDemoAuthed(): boolean {
  try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
}
export function setDemoAuthed() {
  try { sessionStorage.setItem(KEY, '1'); } catch {}
}
export function clearDemoAuthed() {
  try { sessionStorage.removeItem(KEY); } catch {}
}
