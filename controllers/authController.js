const User = require("../models/user");
const bcrypt = require("bcrypt");
const Freelancer = require("../models/freelancer");
const Category = require("../models/category");

module.exports = {
  viewSignup: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("auth/register", {
          alert,
          title: "Register Freelancer | Kerjain",
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
      res.redirect("/register");
    }
  },

  actionSignup: async (req, res) => {
    const emailExists = await User.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (emailExists) return res.status(400).send("Email already taken");

    const { firstname, lastname, email, password, password2, categoryId } =
      req.body;
    if (
      firstname === undefined ||
      lastname === undefined ||
      email === undefined ||
      password === undefined ||
      password2 === undefined ||
      categoryId === undefined
    ) {
      req.flash("alertMessage", "Tolong lengkapi field!");
      req.flash("alertStatus", "danger");
      res.redirect("back");
    } else if (password != password2) {
      req.flash("alertMessage", "Password harus sama!");
      req.flash("alertStatus", "danger");
      res.redirect("back");
    } else {
      const createUser = await User.create({
        name: `${firstname} ${lastname}`,
        email: email.toLowerCase(),
        password,
        level: "freelancer",
        isBanned: true,
      });

      // get selected category
      const category = await Category.findOne({ _id: categoryId });

      // create freelancer user
      const createFreelancer = await Freelancer.create({
        userId: createUser._id,
        categoryId: categoryId,
      });

      // push freelancerId to category schema
      category.freelancerId.push({ _id: createFreelancer._id });
      await category.save();
      req.flash(
        "alertMessage",
        "Berhasil Mendaftar, Tunggu konfirmasi admin untuk bisa login"
      );
      req.flash("alertStatus", "primary");
      res.redirect("/login");
    }
  },

  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user == null || req.session.user == undefined) {
        res.render("auth/login", {
          alert,
          title: "Login | Kerjain",
        });
      } else {
        if (req.session.user.level == "admin") {
          res.redirect("/admin/dashboard");
        } else if (req.session.user.level == "freelancer") {
          res.redirect("/freelancer/dashboard");
        }
      }
    } catch (error) {
      res.redirect("/login");
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email === "" || password === "") {
        req.flash("alertMessage", "Tolong isi field!");
        req.flash("alertStatus", "danger");
        res.redirect("back");
      } else {
        const user = await User.findOne({ email: email.toLowerCase() });
        const userPassword = user ? user.password : "";
        const isPasswordMatch = await bcrypt.compare(password, userPassword);

        if (!user) {
          req.flash("alertMessage", "Email belum terdaftar! Silakan mendaftar");
          req.flash("alertStatus", "danger");
          res.redirect("back");
        } else if (user.level == "service_user") {
          req.flash("alertMessage", "You are not belong here!");
          req.flash("alertStatus", "danger");
          res.redirect("https://kerjain.herokuapp.com/login");
        } else if (!isPasswordMatch) {
          req.flash("alertMessage", "Password salah!");
          req.flash("alertStatus", "danger");
          if (user.level == "admin") {
            res.redirect("back");
          }
          if (user.level == "freelancer") {
            res.redirect("back");
          }
        } else if (user.isBanned == true) {
          req.flash("alertMessage", "Akun anda belum aktif");
          req.flash("alertStatus", "danger");
          res.redirect("back");
        } else {
          req.session.user = {
            id: user._id,
            name: user.name,
            level: user.level,
          };

          if (user.level == "admin") {
            req.flash("alertMessage", "Login Berhasil");
            req.flash("alertStatus", "primary");
            res.redirect("/admin/dashboard");
          }

          if (user.level == "freelancer") {
            req.flash("alertMessage", "Login Berhasil");
            req.flash("alertStatus", "primary");
            res.redirect("/freelancer/dashboard");
          }
        }
      }
    } catch (error) {
      res.redirect("/");
    }
  },

  actionLogout: (req, res) => {
    const session = req.session;
    if (!session.user) return res.redirect("/login");
    if (session.user.level == "admin") {
      session.destroy();
      res.redirect("/login");
    } else if (session.user.level == "freelancer") {
      session.destroy();
      res.redirect("/login");
    }
  },

  actionChangePassword: async (req, res) => {
    const { old_password, password1, password2 } = req.body;
    if (
      old_password === undefined ||
      password1 === undefined ||
      password2 === undefined
    ) {
      req.flash("alertMessage", "Tolong lengkapi field!");
      req.flash("alertStatus", "danger");
      res.redirect("back");
    } else if (password1 !== password2) {
      req.flash("alertMessage", "password dan ulangi password harus sama");
      req.flash("alertStatus", "danger");
      res.redirect("back");
    } else {
      const user = await User.findOne({ _id: req.session.user.id });
      const isPasswordMatch = await bcrypt.compare(old_password, user.password);

      if (!isPasswordMatch) {
        req.flash("alertMessage", "password lama salah");
        req.flash("alertStatus", "danger");
        res.redirect("back");
      } else {
        user.password = password1
        await user.save()
        req.flash("alertMessage", "password berhasil diubah");
        req.flash("alertStatus", "success");
        res.redirect("back");
      }
    }
  },
};
