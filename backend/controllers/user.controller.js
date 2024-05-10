import User from "../models/user.model.js";

export const getUsersForSidebar = async () => {
  try {
    const loggedInUserId = req.authUser._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({
      result: filteredUsers,
      message: "Users fetched",
    });
  } catch (except) {
    res.status(500).json({
      result: except.result ?? null,
      message: except.message ?? "Internal server error",
    });
  }
};
