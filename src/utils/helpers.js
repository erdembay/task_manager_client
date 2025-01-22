import moment from "moment";
export default class Helpers {
  static checklistProgressColor(checklistProgressID) {
    switch (checklistProgressID) {
      case 1:
        return "warning";
      case 2:
        return "success";
      case 3:
        return "error";
      default:
        return "info";
    }
  }
  static formatCurrency(amount) {
    const formattedAmount = parseFloat(amount).toFixed(2);
    const parts = formattedAmount.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }
  static time(time) {
    return moment(parseInt(new Date(time).getTime())).format(
      "DD/MM/YYYY HH:mm:ss"
    );
  }
  static date(time) {
    return moment(parseInt(new Date(time).getTime())).format("DD/MM/YYYY");
  }
}
