export const dashboard = async (req, res) => {

  res.json({
    success: true,
    users: 0,
    orders: 0,
    revenue: 0
  });

};

export const approveRefund = async (req, res) => {

  res.json({
    success: true,
    message: "Refund approved."
  });

};

export const approveSupport = async (req, res) => {

  res.json({
    success: true,
    message: "Support approved."
  });

};

export const uploadListing = async (req, res) => {

  res.json({
    success: true,
    message: "Listing uploaded."
  });

};
