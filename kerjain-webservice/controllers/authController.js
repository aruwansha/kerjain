const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        req.flash("alertMessage", "User is not registered!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "Password is not correct!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }

      if (user.level != "admin") {
        req.flash("alertMessage", "You're not an admin");
        req.flash("alertStatus", "danger");
        res.redirect("/signin");
      }

      req.session.user = {
        id: user._id,
        name: user.name,
      };

      res.redirect("/admin/dashboard");
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },

  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect("/admin/signin");
  },
};
