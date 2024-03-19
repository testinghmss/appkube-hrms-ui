const getAccessTokenFromCookie = () => {
  // Replace 'accessToken' with the name of your cookie containing the access token
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    .split("=")[1];

  return accessToken;
};

export default getAccessTokenFromCookie;
