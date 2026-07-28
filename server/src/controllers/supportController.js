export const getChats = async (req, res) => {

  res.json({
    success: true,
    chats: []
  });

};

export const sendMessage = async (req, res) => {

  res.json({
    success: true,
    message: "Message sent."
  });

};

export const createComplaint = async (req, res) => {

  res.json({
    success: true,
    message: "Complaint received."
  });

};

export const submitAccountSale = async (req, res) => {

  res.json({
    success: true,
    message: "Account submitted."
  });

};
