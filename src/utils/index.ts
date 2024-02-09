const formatDate = (input: string | number | Date, short?: boolean) => {
  const date = new Date(input);
  const options = (
    short
      ? {
          timeZone: "Europe/London",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      : {
          timeZone: "Europe/London",
        }
  ) as Intl.DateTimeFormatOptions;

  const correctDate = new Date(date.getTime() + 1 * 60 * 60 * 1000);

  const locale = "en-GB";

  return isValidDate(correctDate)
    ? correctDate.toLocaleString(locale, options)
    : "TBA";
};

function isValidDate(d: any) {
  return d instanceof Date && !isNaN(d);
}

export { formatDate };
