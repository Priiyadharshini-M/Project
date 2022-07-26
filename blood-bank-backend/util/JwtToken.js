//token for user/donor/admin in cookie
const sendToken = (user) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    token
  };
  return options
};

module.exports = { sendToken };