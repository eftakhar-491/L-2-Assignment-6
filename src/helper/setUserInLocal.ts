const setUserInLocal = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export default setUserInLocal;
