export function timeFormate(timestamp) {
  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate()).toString().padStart(2, "0");
  const hours = (date.getHours()).toString().padStart(2, "0");
  const min = (date.getMinutes()).toString().padStart(2, "0");
  const sec = (date.getSeconds()).toString().padStart(2, "0");

  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  const week = weeks[date.getDay()];
  return `${year}-${month}-${day} ${hours}:${min}:${sec} ${week}`;
}
