export function formatTime(time) {
  let date = new Date(time * 10);
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();
  let decimal = parseInt(date.getMilliseconds() / 10);
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  if (decimal < 10) {
    decimal = "0" + decimal;
  }
  let formattedTime = mm + ":" + ss + ":" + decimal;
  return formattedTime;
}

export default formatTime;
