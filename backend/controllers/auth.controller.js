export const signup = (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
  } catch (except) {}
};

export const login = (req, res) => {
  console.log("loginUser");
};

export const logout = (req, res) => {
  console.log("logoutUser");
};
