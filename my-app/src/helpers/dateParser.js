export default function dateParser(date) {
  const newDate = date ? new Date(date) : new Date();
  const newMonth = newDate.getUTCMonth() + 1;
  return `${newDate.getUTCFullYear()}-${
    newMonth.length > 1 ? newMonth : `0${newMonth}`
  }-${
    newDate.getUTCDate().length > 1
      ? newDate.getUTCDate()
      : `0${newDate.getUTCDate()}`
  }`;
}
