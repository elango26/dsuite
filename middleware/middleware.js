let jwt = require('jsonwebtoken');
var env = require('dotenv').config();

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  //console.log(token+'ddddddd');
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, env.parsed.JWT_KEY, (err, decoded) => {
      if (err) {
        // return res.json({
        //   success: false,
        //   message: 'Token is not valid'
        // });
        return res.status(400).send({
            message:'Invalid token'
        })
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}