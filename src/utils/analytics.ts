type EventPayload = Record<string, string | number | boolean>;

declare global {
  interface Window {
    va?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, payload?: EventPayload) => {
  if (typeof window === "undefined" || typeof window.va !== "function") {
    return;
  }

  window.va("event", { name: eventName, ...payload });
};
