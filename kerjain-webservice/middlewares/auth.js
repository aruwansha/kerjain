const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash("alertMessage", "Session telah berakhir, Silakan Login Kembali!");
    req.flash("alertStatus", "danger");
    res.redirect("/signin");
  } else {
    next();
  }
};

module.exports = isLogin;
