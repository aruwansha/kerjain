const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash("alertMessage", "Session telah berakhir, Silakan Login Kembali!");
    req.flash("alertStatus", "danger");
    res.redirect("/login");
  } else {
    next();
  }
};

const verify = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const token = req.header("x-access-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { isLogin, verify };
