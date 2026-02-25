export type TrackingEventName =
  | "form_submit_attempt"
  | "form_submit_success"
  | "form_submit_error";

type TrackingPayload = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(
  eventName: TrackingEventName,
  payload?: TrackingPayload,
): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("baselinefairway:track", {
      detail: {
        eventName,
        payload: payload ?? {},
      },
    }),
  );
}
