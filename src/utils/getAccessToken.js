const getAccessTokenFromCookie = () => {
  // Replace 'accessToken' with the name of your cookie containing the access token
  const accessToken =  document.cookie && document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    .split("=")[1];

  return accessToken;
};

export const removeAccessToken=()=>{
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

}

export default getAccessTokenFromCookie;
