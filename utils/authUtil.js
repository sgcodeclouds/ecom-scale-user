const axios = require("axios");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  let data = JSON.stringify({
    token:authHeader,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.API_URL + "auth/validate-token",
    headers: {
      "Content-Type": "application/json"
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      req.user = response.user;
      next();
    })
    .catch((error) => {
      // console.log(error);
      return res.status(403).json({ message: "Unauthorized: Invalid token" });
    });

  
};

module.exports = { authenticateToken };
