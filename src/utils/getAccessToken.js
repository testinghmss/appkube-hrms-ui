const getAccessTokenFromCookie = () => {
  // Check if document is defined (running in the client-side context)
  if (typeof document !== 'undefined') {
    // Replace 'accessToken' with the name of your cookie containing the access token
    const accessToken = document.cookie && document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    return accessToken;
  } else {
    return null; // Return null if document is not defined
  }
};

export const removeAccessToken = () => {
  // Check if document is defined (running in the client-side context)
  if (typeof document !== 'undefined') {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
};

export default getAccessTokenFromCookie;