export const initializePayment = async (req, res) => {
  res.json({
    success: true,
    message: "Payment initialized."
  });
};

export const verifyPayment = async (req, res) => {
  res.json({
    success: true,
    reference: req.params.reference
  });
};

export const refundPayment = async (req, res) => {
  res.json({
    success: true,
    message: "Refund request sent to admin."
  });
};
