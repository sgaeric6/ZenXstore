export const getProfile = async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user?.id,
      email: req.user?.email,
      role: req.user?.role
    }
  });
};

export const updateProfile = async (req, res) => {
  res.json({
    success: true,
    message: "Profile updated successfully."
  });
};
