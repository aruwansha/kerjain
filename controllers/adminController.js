const Category = require("../models/category");
const Bank = require("../models/bank");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Order = require("../models/order");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const freelancer = await Freelancer.find();
        const serviceUser = await ServiceUser.find();
        const order = await Order.find();
        res.render("admin/dashboard/view_dashboard", {
          title: "Dashboard | Admin Kerjain",
          alert,
          user: req.session.user,
          freelancer,
          serviceUser,
          order,
        });
      }
    } catch (error) {
      res.redirect("back");
    }
  },

  viewCategory: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const category = await Category.find();
        res.render("admin/category/view_category", {
          title: "View Category | Admin Kerjain",
          user: req.session.user,
          category,
          alert,
        });
      }
    } catch (error) {
      res.redirect("category");
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.create({ name });
      req.flash("alertMessage", "Succesfully Added Category");
      req.flash("alertStatus", "success");
      res.redirect("category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flafh("alertStatus", "danger");
      res.redirect("category");
    }
  },

  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = name;
      await category.save();
      req.flash("alertMessage", "Succesfully Edited Category");
      req.flash("alertStatus", "success");
      res.redirect("category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flafh("alertStatus", "danger");
      res.redirect("category");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.body;
      const category = await Category.findOne({ _id: id });
      await category.remove();
      req.flash("alertMessage", "Succesfully Deleted Category");
      req.flash("alertStatus", "danger");
      res.redirect("category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flafh("alertStatus", "danger");
      res.redirect("category");
    }
  },

  viewBank: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const bank = await Bank.find();
        res.render("admin/bank/view_bank", {
          title: "View Bank | Admin Kerjain",
          user: req.session.user,
          bank,
          alert,
        });
      }
    } catch (error) {
      res.redirect("bank");
    }
  },

  addBank: async (req, res) => {
    try {
      const { bankName, bankAccount, accountHolder } = req.body;
      await Bank.create({
        bankName,
        bankAccount,
        accountHolder,
        imgUrl: `images/${req.file.filename}`,
      });
      req.flash("alertMessage", "Succesfully Added bank");
      req.flash("alertStatus", "success");
      res.redirect("bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("bank");
    }
  },

  editBank: async (req, res) => {
    try {
      const { id, bankName, bankAccount, accountHolder } = req.body;
      const bank = await Bank.findOne({ _id: id });
      if (req.file == undefined) {
        bank.bankName = bankName;
        bank.bankAccount = bankAccount;
        bank.accountHolder = accountHolder;
        await bank.save();
        req.flash("alertMessage", "Succesfully Edited bank");
        req.flash("alertStatus", "success");
        res.redirect("bank");
      } else {
        await fs.unlink(path.join(`public/${bank.imgUrl}`));
        bank.bankName = bankName;
        bank.bankAccount = bankAccount;
        bank.accountHolder = accountHolder;
        bank.imgUrl = `images/bank/${req.file.filename}`;
        await bank.save();
        req.flash("alertMessage", "Succesfully Edited bank");
        req.flash("alertStatus", "success");
        res.redirect("bank");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("bank");
    }
  },

  deleteBank: async (req, res) => {
    try {
      const { id } = req.body;
      const bank = await Bank.findOne({ _id: id });
      await bank.remove();
      req.flash("alertMessage", "Succesfully Deleted bank");
      req.flash("alertStatus", "success");
      res.redirect("bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flafh("alertStatus", "danger");
      res.redirect("bank");
    }
  },

  viewFreelancer: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const category = await Category.find();
        const freelancer = await Freelancer.find()
          .populate("userId")
          .populate("categoryId");
        res.render("admin/freelancer/view_freelancer", {
          title: "View Freelancer | Admin Kerjain",
          user: req.session.user,
          category,
          freelancer,
          alert,
          action: "view",
        });
      }
    } catch (error) {
      res.redirect("freelancer");
    }
  },

  showDetailFreelancer: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const { id } = req.params;
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const freelancer = await Freelancer.findOne({ _id: id })
          .populate({
            path: "categoryId",
            select: "id name",
          })
          .populate({
            path: "userId",
            select: "id name email address phone isBanned",
          });
        const category = await Category.find();
        res.render("admin/freelancer/view_freelancer", {
          title: "Detail Freelancer | Admin Kerjain",
          user: req.session.user,
          freelancer,
          category,
          alert,
          action: "detail",
        });
      }
    } catch (error) {}
  },

  banFreelancer: async (req, res) => {
    try {
      const { id } = req.params;
      const freelancer = await Freelancer.findOne({ _id: id }).populate({
        path: "userId",
        select: "id name isBanned",
      });

      const filter = { _id: freelancer.userId._id };
      if (freelancer.userId.isBanned == false) {
        await User.updateOne(filter, { isBanned: true });
        req.flash("alertMessage", `${freelancer.userId.name} has been banned`);
      } else {
        await User.updateOne(filter, { isBanned: false });
        req.flash(
          "alertMessage",
          `${freelancer.userId.name} has been unbanned`
        );
      }
      req.flash("alertStatus", "success");
      res.redirect("back");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("freelancer");
    }
  },

  addFreelancer: async (req, res) => {
    try {
      // get request from page
      const {
        categoryId,
        name,
        email,
        password,
        birthdate,
        address,
        phone,
        rating,
      } = req.body;
      // create user
      const user = await User.create({
        name,
        email,
        password,
        level: "freelancer",
        birthdate,
        address,
        phone,
      });
      // get selected category
      const category = await Category.findOne({ _id: categoryId });
      // create freelancer
      const freelancer = await Freelancer.create({
        userId: user._id,
        categoryId: category._id,
        rating,
      });
      // // get userId
      // const getUserById = await User.findOne({ _id: user._id });
      // // push userId to user schema
      // getUserById.freelancerId.push({ _id: freelancer._id });
      // await getUserById.save();
      // push userId to category schema
      category.freelancerId.push({ _id: freelancer._id });
      await category.save();
      req.flash("alertMessage", "Sucessfully Add Freelancer");
      req.flash("alertStatus", "success");
      res.redirect("freelancer");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("freelancer");
    }
  },

  deleteFreelancer: async (req, res) => {
    try {
      const { id } = req.params;
      const freelancer = await Freelancer.findOne({ _id: id });
      const user = await User.findOne({ _id: freelancer.userId });
      // delete user row
      await user.remove();
      // slice array freelancerId in Category
      await Category.updateOne(
        { _id: freelancer.categoryId },
        { $pull: { freelancerId: freelancer._id } }
      );
      // delete freelancer row
      await freelancer.remove();
      req.flash("alertMessage", "Delete Success");
      req.flash("alertStatus", "success");
      res.redirect("/admin/freelancer");
    } catch (error) {
      res.redirect("/admin/freelancer");
    }
  },

  viewServiceUser: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const serviceUser = await ServiceUser.find().populate("userId");
        res.render("admin/service_user/view_service_user", {
          title: "View Service User | Admin Kerjain",
          user: req.session.user,
          serviceUser,
          alert,
          action: "view",
        });
      }
    } catch (error) {
      res.redirect("service_user");
    }
  },

  banServiceUser: async (req, res) => {
    try {
      const { id } = req.params;
      const serviceUser = await ServiceUser.findOne({ _id: id }).populate({
        path: "userId",
        select: "id name isBanned",
      });
      const filter = { _id: serviceUser.userId._id };

      if (serviceUser.userId.isBanned == false) {
        await User.updateOne(filter, { isBanned: true });
        req.flash("alertMessage", `${serviceUser.userId.name} has been banned`);
      } else {
        await User.updateOne(filter, { isBanned: false });
        req.flash(
          "alertMessage",
          `${serviceUser.userId.name} has been unbanned`
        );
      }
      req.flash("alertStatus", "success");
      res.redirect("back");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("freelancer");
    }
  },

  showDetailServiceUser: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const { id } = req.params;
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const serviceUser = await ServiceUser.findOne({ _id: id }).populate({
          path: "userId",
          select: "id name email address phone isBanned",
        });
        res.render("admin/service_user/view_service_user", {
          title: "Detail Service User | Admin Kerjain",
          user: req.session.user,
          serviceUser,
          alert,
          action: "detail",
        });
      }
    } catch (error) {}
  },

  deleteServiceUser: async (req, res) => {
    try {
      const { id } = req.params;
      const serviceuser = await ServiceUser.findOne({ _id: id });
      const user = await User.findOne({ _id: serviceuser.userId });
      // delete user row
      await user.remove();
      // delete freelancer row
      await serviceuser.remove();
      req.flash("alertMessage", "Delete Success");
      req.flash("alertStatus", "success");
      res.redirect("/admin/serviceuser");
    } catch (error) {}
  },

  viewOrder: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const order = await Order.find()
          .select("id accountHolder orderDate total payments")
          .sort("orderDate");
        res.render("admin/order/view_order", {
          title: "View Order | Admin Kerjain",
          user: req.session.user,
          alert,
          order,
          action: "view",
        });
      }
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  },

  viewDetailOrder: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "admin") {
        level == "freelancer" ? res.redirect("/freelancer") : res.redirect("/");
      } else {
        const { id } = req.params;
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const order = await Order.findOne({ _id: id }).populate({
          path: "serviceUserId",
          select: "id userId",
        });
        const user = await User.findOne({ _id: order.serviceUserId.userId });
        res.render("admin/order/view_order", {
          title: "Detail Order | Admin Kerjain",
          user: req.session.user,
          alert,
          order,
          user,
          action: "detail",
        });
      }
    } catch (error) {
      res.redirect("/admin/order");
    }
  },
  actionConfirmOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findOne({ _id: id });
      order.payments.status = "paid";
      await order.save();
      req.flash("alertMessage", "Order Confirmed");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/order/${id}`);
    } catch (error) {
      res.redirect("/admin/order");
    }
  },

  actionRejectOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findOne({ _id: id });
      order.payments.status = "rejected";
      req.flash("alertMessage", "Order Rejected");
      req.flash("alertStatus", "success");
      await order.save();
      res.redirect(`/admin/order/${id}`);
    } catch (error) {
      res.redirect("/admin/order");
    }
  },
};
