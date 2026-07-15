export const getUser = () => {
  try {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined") {
      return null;
    }

    return JSON.parse(user);

  } catch (error) {
    console.error("Invalid user data", error);
    localStorage.removeItem("user");
    return null;
  }
};


export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("user_token");

  window.dispatchEvent(new Event("authChanged"));
};