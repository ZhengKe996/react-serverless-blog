export const parseJsonByString = (str, defaultValue) => {
  let returnValue = defaultValue;
  try {
    returnValue = JSON.parse(str);
  } catch (e) {}
  return returnValue;
};

export const getLoginStatus = () => {
  const { token, tokenExpiredAt } = window.localStorage;
  const currentTime = new Date().getTime();
  const expireTime = new Date(tokenExpiredAt).getTime();

  if (token && currentTime <= expireTime) return true;

  clearLogout();
};
export const clearLogout = () => {
  window.localStorage.removeItem("tokenExpiredAt");
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("photo");
};

export const setLoginData = ({ token, tokenExpiredAt, username, photo }) => {
  window.localStorage.token = token;
  window.localStorage.tokenExpiredAt = tokenExpiredAt;
  window.localStorage.photo = photo;
  window.localStorage.username = username;
};
