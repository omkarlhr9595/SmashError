import { formatDistanceToNowStrict } from "date-fns";
export const formatDateAgo = (date) => {
  return formatDistanceToNowStrict(new Date(date));
};
