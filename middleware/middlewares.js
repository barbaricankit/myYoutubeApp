const { User } = require("../models/user.model");

const checkUser = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (user) {
    req.userId = userId;
    req.user = user;
    next();
  } else {
    res.json({ success: false, message: "Invalid User Id" });
  }
};

module.exports = {
  checkUser,
};
