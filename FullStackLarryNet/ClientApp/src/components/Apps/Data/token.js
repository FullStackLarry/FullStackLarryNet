export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) return `Bearer ${token}`;
  return token;
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};
