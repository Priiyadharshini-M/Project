const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    console.log("token:"+token)
    return res.status(statusCode).cookie("token", token, options).json({
      accessToken : token
    });
  };
  
  const sendAdminToken = (admin, statusCode, res) => {
    const token = admin.getJWTToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 60 * 1000 
      ),
      httpOnly: true
    };
  
    return res.status(statusCode).cookie("adminToken", token, options).json({
      accessToken:token,
    });
  };

  const sendDonorToken = (donor, statusCode, res) => {
    console.log("entered send donor")
    const token = donor.getJWTToken();
    console.log("token for donor:"+token)
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 
      ),
      httpOnly: true
    };

    // console.log("token for donor:"+token)
    return res.status(statusCode).cookie("donorToken", token, options).json({
      accessToken : token,
    });
  };
  
  module.exports = { sendToken, sendAdminToken, sendDonorToken };