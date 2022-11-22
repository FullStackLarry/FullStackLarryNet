export const APIBase = () => {
  if (process.env.NODE_ENV === "development") return "http://localhost:5000/";

  return "https://fslapi.herokuapp.com/";
};

export const APIUrl = () => {
  return `${APIBase()}v1/`;
};
