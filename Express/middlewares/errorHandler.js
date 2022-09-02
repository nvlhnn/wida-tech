const setResponse = require("../utils/response");

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.code) {
    const response = setResponse(false, null, err.message);
    res.status(err.code).json(response);
  } else {
    const response = setResponse(false, null, "Internal Server Error");
    res.status(500).json(response);
  }
}

module.exports = errorHandler;
