const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          alert,
          title: "Login | Kerjain",
        });
      } else {
        if (req.session.user.level == "admin") {
          res.redirect("/admin/dashboard");
        }
        if (req.session.user.level == "freelancer") {
          res.redirect("/freelancer/dashboard");
        }
      }
    } catch (error) {
      res.redirect("/signin");
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        req.flash("alertMessage", "User is not registered!");
        req.flash("alertStatus", "danger");
        res.redirect("back");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        req.flash("alertMessage", "Password is not correct!");
        req.flash("alertStatus", "danger");
        if (user.level == "admin") {
          res.redirect("back");
        }
        if (user.level == "freelancer") {
          res.redirect("back");
        }
      }

      req.session.user = {
        id: user._id,
        name: user.name,
        level: user.level,
      };

      if (user.level == "admin") {
        req.flash("alertMessage", "Login Successfull");
        req.flash("alertStatus", "primary");
        res.redirect("/admin/dashboard");
      }

      if (user.level == "freelancer") {
        req.flash("alertMessage", "Login Berhasil");
        req.flash("alertStatus", "primary");
        res.redirect("/freelancer/dashboard");
      }
    } catch (error) {
      res.redirect("/");
    }
  },

  actionLogout: (req, res) => {
    const session = req.session;
    if (!session.user) return res.redirect("/signin");
    console.log(session);
    if (session.user.level == "admin") {
      session.destroy();
      res.redirect("/signin");
    } else if (session.user.level == "freelancer") {
      session.destroy();
      res.redirect("/signin");
    }
  },
};
