const Category = require("../models/category");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Service = require("../models/service");
const Request = require("../models/request");
const Order = require("../models/order");
const Chat = require("../models/chat");
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
      const unread = await Chat.find({ isRead: false }).select("isRead");
      res.render("freelancer/dashboard/view_dashboard", {
        title: "Dashboard | Freelancer",
        user: req.session.user,
        alert,
        unread,
        order,
        unread,
      });
    }
  },

  viewProfile: async (req, res) => {
    const level = req.session.user.level;
    if (level != "freelancer") {
      level == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const id = req.session.user.id;
      const unread = await Chat.find({ isRead: false }).select("isRead");
      const freelancer = await Freelancer.findOne({ userId: id })
        .select(
          "_id title description rating bankName bankAccount accountHolder"
        )
        .populate("userId")
        .populate({ path: "categoryId", select: "id name" });
      res.render("freelancer/profile/view_profile", {
        title: "Dashboard | Profile",
        user: req.session.user,
        alert,
        unread,
        freelancer,
      });
    }
  },

  viewService: async (req, res) => {
    const level = req.session.user.level;
    if (level != "freelancer") {
      level == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const id = req.session.user.id;
      const unread = await Chat.find({ isRead: false }).select("isRead");
      const freelancer = await Freelancer.findOne({ userId: id }).select("_id");
      const service = await Service.find({ freelancerId: freelancer._id });
      res.render("freelancer/service/view_service", {
        title: "Dashboard | Profile",
        user: req.session.user,
        alert,
        unread,
        service,
      });
    }
  },

  actionAddService: async (req, res) => {
    try {
      const { title, description, price } = req.body;
      const freelancer = await Freelancer.findOne({
        userId: req.session.user.id,
      });
      console.log(freelancer, title, description, price);
      await Service.create({
        freelancerId: freelancer._id,
        title,
        description,
        price,
      });
      req.flash("alertMessage", "Berhasil menambahkan data");
      req.flash("alertStatus", "success");
      res.redirect("/freelancer/service");
    } catch (error) {}
  },

  actionEditServiceDetail: async (req, res) => {
    try {
      const { id, title, description, price } = req.body;
      const service = await Service.findOne({ _id: id });
      console.log(service._id, id, title, description, price);
      service.title = title;
      service.description = description;
      service.price = price;
      await service.save();
      req.flash("alertMessage", "Berhasil mengubah data");
      req.flash("alertStatus", "success");
      res.redirect("/freelancer/service");
    } catch (error) {}
  },

  actionDeleteServiceDetail: async (req, res) => {
    try {
      const { id } = req.body;
      const service = await Service.findOne({ _id: id });
      await service.remove();
      req.flash("alertMessage", "Berhasil menghapus data");
      req.flash("alertStatus", "success");
      res.redirect("/freelancer/service");
    } catch (error) {}
  },

  viewRequest: async (req, res) => {
    const level = req.session.user.level;
    if (level != "freelancer") {
      level == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const unread = await Chat.find({ isRead: false }).select("isRead");
      const request = await Request.find();
      for (i = 0; i < request.length; i++) {
        const serviceUser = await ServiceUser.find({
          _id: request[i].serviceUserId,
        })
          .select("id userId")
          .populate({ path: "userId", select: "name" });
        console.log(request[i].serviceUserId);
        res.render("freelancer/request/view_request", {
          title: "Dashboard | Permintaan",
          user: req.session.user,
          alert,
          unread,
          request,
          serviceUser,
        });
      }
    }
  },

  viewChat: async (req, res) => {
    const level = req.session.user.level;
    if (level != "freelancer") {
      level == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const unread = await Chat.find({ isRead: false }).select("isRead");
      const chats = await Chat.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "serviceUserId",
            foreignField: "_id",
            as: "serviceUserId",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "from",
            foreignField: "_id",
            as: "from",
          },
        },
        { $sort: { time: -1 } },
        {
          $group: {
            _id: "$serviceUserId",
            doc: { $first: "$$ROOT" },
          },
        },
      ]);
      res.render("freelancer/chat/view_chat", {
        title: "Chat | Kerjain",
        user: req.session.user,
        alert,
        unread,
        chats,
      });
    }
  },

  actionDeleteChat: async (req, res) => {
    try {
      const { id } = req.params;
      await Chat.remove({ serviceUserId: id });
      req.flash("alertMessage", "Chat berhasil dihapus");
      req.flash("alertStatus", "primary");
      res.redirect("/freelancer/chat");
    } catch (error) {
      req.flash("alertMessage", error);
      req.flash("alertStatus", "primary");
      res.redirect("/freelancer/chat");
    }
  },

  viewDetailChat: async (req, res) => {
    const level = req.session.user.level;
    if (level != "freelancer") {
      level == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const unread = await Chat.find({ isRead: false }).select("isRead");
      const serviceUserId = req.params;

      var perPage = 10,
        page = Math.max(0, req.params.page);
      await Chat.find({ serviceUserId: serviceUserId.id })
        .populate({ path: "from", select: "id name" })
        .limit(perPage)
        .skip(perPage * page)
        .sort("time")
        .exec(function (err, chats) {
          for (i = 0; i < chats.length; i++) {
            console.log(chats[i]);
            chats[i].isRead = true;
            chats[i].save(function (err) {
              if (err) {
                console.error("ERROR!");
              }
            });
          }
          Chat.count({ serviceUserId: serviceUserId.id }).exec(function (
            err,
            count
          ) {
            res.render("freelancer/chat/view_detail_chat", {
              title: "Detail Chat | Kerjain",
              user: req.session.user,
              alert,
              unread,
              chats,
              page,
              pages: count / perPage,
            });
          });
        });
    }
  },

  actionDeleteDetailChat: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await Chat.findOne({ _id: id });
      const serviceUserId = chat.serviceUserId;
      await chat.remove();
      req.flash("alertMessage", "Chat berhasil dihapus");
      req.flash("alertStatus", "primary");
      res.redirect(`/freelancer/chat/${serviceUserId}`);
    } catch (error) {
      req.flash("alertMessage", error);
      req.flash("alertStatus", "primary");
      res.redirect("/freelancer/chat");
    }
  },

  actionReplyChat: async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    console.log(message);
    await Chat.create({
      freelancerId: req.session.user.id,
      serviceUserId: id,
      from: req.session.user.id,
      to: id,
      message: message,
      isRead: true,
    });
    req.flash("alertMessage", "Pesan Terkirim");
    req.flash("alertStatus", "primary");
    res.redirect(`/freelancer/chat/${id}`);
  },

  viewEditProfil: async (req, res) => {
    const level = req.session.user.level;
    if (level != "freelancer") {
      level == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const id = req.session.user.id;
      const unread = await Chat.find({ isRead: false }).select("isRead");
      const freelancer = await Freelancer.findOne({ userId: id })
        .select(
          "_id title description rating bankName bankAccount accountHolder"
        )
        .populate("userId")
        .populate({ path: "categoryId", select: "id name" });
      res.render("freelancer/setting/view_edit_profile", {
        title: "Dashboard | Profile",
        user: req.session.user,
        alert,
        unread,
        freelancer,
      });
    }
  },

  actionEditPersonal: async (req, res) => {
    try {
      const { name, email, address, phone } = req.body;
      const user = await User.findOne({ _id: req.session.user.id });
      user.name = name;
      user.email = email;
      user.address = address;
      user.phone = phone;
      await user.save();
      req.flash("alertMessage", "Data berhasil disimpan");
      req.flash("alertStatus", "primary");
      res.redirect("/freelancer/profile");
    } catch (error) {
      res.redirect("/freelancer/profile");
    }
  },

  actionEditService: async (req, res) => {
    try {
      const { title, description, image } = req.body;
      const freelancer = await Freelancer.findOne({
        userId: req.session.user.id,
      });
      freelancer.title = title;
      freelancer.description = description;
      await freelancer.save();
      req.flash("alertMessage", "Data berhasil disimpan");
      req.flash("alertStatus", "primary");
      res.redirect("/freelancer/profile");
    } catch (error) {
      res.redirect("/freelancer/profile");
    }
  },

  actionEditBank: async (req, res) => {
    try {
      const { bankName, bankAccount, accountHolder } = req.body;
      const freelancer = await Freelancer.findOne({
        userId: req.session.user.id,
      });
      freelancer.bankName = bankName;
      freelancer.bankAccount = bankAccount;
      freelancer.accountHolder = accountHolder;
      await freelancer.save();
      req.flash("alertMessage", "Data berhasil disimpan");
      req.flash("alertStatus", "primary");
      res.redirect("/freelancer/profile");
    } catch (error) {
      res.redirect("/freelancer/profile");
    }
  },

  viewOrder: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "freelancer") {
        level == "admin" ? res.redirect("/admin") : res.redirect("/");
      } else {
        const id = req.session.user.id;
        const unread = await Chat.find({ isRead: false }).select("isRead");
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const order = await Freelancer.findOne({ userId: id })
          .select("orderId")
          .populate({
            path: "orderId",
            select: "id orderDate status total",
          });
        const totalOrder = order.orderId.length;
        for (i = 0; i < totalOrder; i++) {
          const orderId = await Order.findOne({ _id: order.orderId[i].id })
            .select("serviceUserId")
            .populate({ path: "serviceUserId", select: "userId" });
          const user = await User.findOne({
            _id: orderId.serviceUserId.userId,
          }).select("name");
          console.log(user);
          res.render("freelancer/order/view_order", {
            title: "View Order | Admin Kerjain",
            user: req.session.user,
            alert,
            unread,
            order,
            totalOrder,
            user,
            action: "view",
          });
        }
      }
    } catch (error) {
      res.redirect("/freelancer/dashboard");
    }
  },
};
