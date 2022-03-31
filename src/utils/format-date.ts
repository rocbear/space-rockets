import { DateTime } from "luxon";

export function formatDate(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTime(timestamp: string, keepTimeZone = false) {
  const dateTime = DateTime.fromISO(timestamp, {
    setZone: keepTimeZone,
    locale: "en-US"
  });
  return dateTime.toLocaleString({
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });
}
