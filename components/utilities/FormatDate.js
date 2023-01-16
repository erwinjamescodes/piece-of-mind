export default function formatDate(postedAt) {
  let date = new Date(postedAt);
  let options = {
    numeric: "auto",
    style: "long",
  };
  let rtf = new Intl.RelativeTimeFormat("en", options);
  let timeDiff = Date.now() - date;
  let timeDiffInSeconds = Math.round(timeDiff / 1000);
  let timeDiffInMinutes = Math.round(timeDiffInSeconds / 60);
  let timeDiffInHours = Math.round(timeDiffInMinutes / 60);
  let timeDiffInDays = Math.round(timeDiffInHours / 24);
  let timeDiffInWeeks = Math.round(timeDiffInDays / 7);
  let timeDiffInMonths = Math.round(timeDiffInWeeks / 4);
  let timeDiffInYears = Math.round(timeDiffInMonths / 12);

  if (timeDiffInSeconds < 60) {
    const relativeTime = rtf.format(-timeDiffInSeconds, "second");
    return relativeTime;
  } else if (timeDiffInMinutes < 60) {
    const relativeTime = rtf.format(-timeDiffInMinutes, "minute");
    return relativeTime;
  } else if (timeDiffInHours < 24) {
    const relativeTime = rtf.format(-timeDiffInHours, "hour");
    return relativeTime;
  } else if (timeDiffInDays < 7) {
    const relativeTime = rtf.format(-timeDiffInDays, "day");
    return relativeTime;
  } else if (timeDiffInWeeks < 4) {
    const relativeTime = rtf.format(-timeDiffInWeeks, "week");
    return relativeTime;
  } else if (timeDiffInMonths < 12) {
    const relativeTime = rtf.format(-timeDiffInMonths, "month");
    return relativeTime;
  } else {
    const relativeTime = rtf.format(-timeDiffInYears, "year");
    return relativeTime;
  }
}
