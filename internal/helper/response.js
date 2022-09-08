export const Response = {
  success: (res, msg, data) => {
    return res.status(200).json({
      success: true,
      message: msg,
      data: data,
    });
  },

  error: (res, msg) => {
    return res.status(400).json({
      success: false,
      message: msg,
    });
  },
};
