//token for user in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  return res.status(statusCode).cookie("token", token, options).json({
    accessToken: token
  }); I
};

//token for admin in cookie
const sendAdminToken = (admin, statusCode, res) => {
  const token = admin.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 60 * 1000
    ),
    httpOnly: true
  };

  return res.status(statusCode).cookie("adminToken", token, options).json({
    accessToken: token,
  });
};

//token for donor in cookie
const sendDonorToken = (donor, statusCode, res) => {
  const token = donor.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  return res.status(statusCode).cookie("donorToken", token, options).json({
    accessToken: token,
  });
};

module.exports = { sendToken, sendAdminToken, sendDonorToken };