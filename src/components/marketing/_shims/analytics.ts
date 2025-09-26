// UI-only, no-op analytics used by marketing pages only.
export type AnalyticsEvent =
  | { type: "cta_click"; label: string }
  | { type: "nav_click"; label: string }
  | { type: "card_view"; label: string };
export function track(_e: AnalyticsEvent): void {}
