const sendResponse = (res, data) => {
  const ResponseData = {
    status: data.status || 'success',
    statusCode: data.statusCode,
    message: data?.message || 'Data retrieved successfully',
    meta: data.meta || null,
    data: data?.data || null,
  };

  res.status(ResponseData.statusCode).json(ResponseData);
};

module.exports = sendResponse;
