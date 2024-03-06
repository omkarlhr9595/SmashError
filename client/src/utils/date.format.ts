import {
  isToday,
  isYesterday,
  format,
  formatDistance,
  subDays,
} from "date-fns";

export const dateToText = (date: string) => {
    const parsedDate = new Date(date);
    if (isToday(parsedDate)) {
        return format(parsedDate, "h:mm a");
    }
    if (isYesterday(parsedDate)) {
        return "Yesterday";
    }
    return formatDistance(subDays(new Date(), 1), parsedDate, {
        addSuffix: true,
    });
};
