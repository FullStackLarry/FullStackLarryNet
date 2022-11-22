import { toast } from "react-toastify";

export const toastifyOptions = {
  theme: "colored",
  position: toast.POSITION.TOP_CENTER,
  pauseOnHover: false,
};

export const convertDate = (date) => {
  if (!date) return "";
  if (typeof date === "string") {
    if (date.includes("/")) {
      return (
        date.substring(6, 10) +
        "-" +
        date.substring(0, 2) +
        "-" +
        date.substring(3, 5)
      );
    }
    return date;
  }

  let dt;
  if (typeof date === "object") dt = date;
  else dt = new Date(date);
  const m = dt.getMonth() + 1;
  const d = dt.getDate();
  const y = dt.getFullYear();
  return (
    y.toString() +
    "-" +
    m.toString().padStart(2, "0") +
    "-" +
    d.toString().padStart(2, "0")
  );
};

export const displayDate = (date) => {
  if (!date) return "";
  if (typeof date === "string") {
    if (date.includes("-"))
      return (
        date.substring(5, 7) +
        "/" +
        date.substring(8, 10) +
        "/" +
        date.substring(0, 4)
      );
    return date;
  }

  let dt;
  if (typeof date === "object") dt = date;
  else dt = new Date(date);
  const m = dt.getMonth() + 1;
  const d = dt.getDate();
  const y = dt.getFullYear();
  return (
    m.toString().padStart(2, "0") +
    "/" +
    d.toString().padStart(2, "0") +
    "/" +
    y.toString()
  );
};
