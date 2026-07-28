export const createOrder = async (req, res) => {
  res.status(201).json({
    success: true,
    message: "Order created."
  });
};

export const getOrders = async (req, res) => {
  res.json({
    success: true,
    orders: []
  });
};

export const getOrder = async (req, res) => {
  res.json({
    success: true,
    orderId: req.params.id
  });
};

export const updateOrder = async (req, res) => {
  res.json({
    success: true,
    message: "Order updated."
  });
};
