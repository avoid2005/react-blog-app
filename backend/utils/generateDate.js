const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getNow() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${day < 10 ? `0${day}` : day}-${monthNames[month]
    }-${year}-${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute
    }`;
}
