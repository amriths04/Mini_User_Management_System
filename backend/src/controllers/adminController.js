import User from "../models/userModel.js";


export const getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      success: true,
      data: users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};


export const activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.user._id.toString() === req.params.id) {
  return res.status(400).json({
    success: false,
    message: "You cannot modify your own account"
  });
}

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.status = "active";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User activated successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to activate user"
    });
  }
};


export const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.user._id.toString() === req.params.id) {
  return res.status(400).json({
    success: false,
    message: "You cannot modify your own account"
  });
}

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.status = "inactive";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User deactivated successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to deactivate user"
    });
  }
};
