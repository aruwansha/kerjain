const Category = require("../models/category");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Order = require("../models/order");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewDashboard: async (req, res) => {
    const level = req.session.user.level;
    if (level != "freelancer") {
      level == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const id = req.session.user.id;
      const order = await Freelancer.findOne({ userId: id })
        .select("_id")
        .populate("orderId");
      res.render("freelancer/dashboard/view_dashboard", {
        title: "Dashboard | Freelancer",
        user: req.session.user,
        alert,
        order,
      });
    }
  },

  viewOrder: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "freelancer") {
        level == "admin" ? res.redirect("/admin") : res.redirect("/");
      } else {
        const userId = req.session.user.id;
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const order = await Freelancer.findOne({ userId: userId })
          .select("orderId")
          .populate({ path: "orderId", select: "id orderDate accountHolder bankFrom status " });
        const totalOrder = order.orderId.length;
        res.render("freelancer/order/view_order", {
          title: "View Order | Admin Kerjain",
          user: req.session.user,
          alert,
          order,
          totalOrder,
          action: "view",
        });
      }
    } catch (error) {
      res.redirect("/freelancer/dashboard");
    }
  },
};
