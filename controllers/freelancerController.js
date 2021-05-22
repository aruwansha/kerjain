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
      const unread = await Chat.find({
        freelancerUserId: req.session.user.id,
        isReadFreelancer: false,
      }).select("isReadFreelancer");
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
      const unread = await Chat.find({
        freelancerUserId: req.session.user.id,
        isReadFreelancer: false,
      }).select("isReadFreelancer");
      const freelancer = await Freelancer.findOne({ userId: id })
        .select(
          "_id title description rating bankName bankAccount accountHolder imgUrl"
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
      const unread = await Chat.find({
        freelancerUserId: req.session.user.id,
        isReadFreelancer: false,
      }).select("isReadFreelancer");
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
      await Service.create({
        freelancerId: freelancer._id,
        title,
        description,
        price,
        imgUrl: `images/service/${req.file.filename}`,
      });
      req.flash("alertMessage", "Berhasil menambahkan data");
      req.flash("alertStatus", "success");
      res.redirect("/freelancer/service");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "danger");
      res.redirect("/freelancer/service");
    }
  },

  actionEditServiceDetail: async (req, res) => {
    try {
      const { id, title, description, price } = req.body;
      const service = await Service.findOne({ _id: id });
      if (req.file == undefined) {
        service.title = title;
        service.description = description;
        service.price = price;
        await service.save();
      } else {
        if (fs.existsSync(path.join(`public/${service.imgUrl}`))) {
          await fs.unlink(path.join(`public/${service.imgUrl}`));
        }
        service.title = title;
        service.description = description;
        service.price = price;
        service.imgUrl = `images/service/${req.file.filename}`;
        await service.save();
      }
      req.flash("alertMessage", "Berhasil mengubah data");
      req.flash("alertStatus", "success");
      res.redirect("/freelancer/service");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "danger");
      res.redirect("/freelancer/service");
    }
  },

  actionDeleteServiceDetail: async (req, res) => {
    try {
      const { id } = req.body;
      const service = await Service.findOne({ _id: id });
      if (fs.existsSync(path.join(`public/${service.imgUrl}`))) {
        await fs.unlink(path.join(`public/${service.imgUrl}`));
      }
      await service.remove();
      req.flash("alertMessage", "Berhasil menghapus data");
      req.flash("alertStatus", "success");
      res.redirect("/freelancer/service");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "danger");
      res.redirect("/freelancer/service");
    }
  },

  viewRequest: async (req, res) => {
    const level = req.session.user.level;
    if (level != "freelancer") {
      level == "admin" ? res.redirect("/admin") : res.redirect("/");
    } else {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const unread = await Chat.find({
        freelancerUserId: req.session.user.id,
        isReadFreelancer: false,
      }).select("isReadFreelancer");
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
      const unread = await Chat.find({
        freelancerUserId: req.session.user.id,
        isReadFreelancer: false,
      }).select("isReadFreelancer");
      const mongoose = require("mongoose");
      const chats = await Chat.aggregate([
        {
          $match: {
            freelancerUserId: mongoose.Types.ObjectId(req.session.user.id),
          },
        },
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
      const unread = await Chat.find({
        freelancerUserId: req.session.user.id,
        isReadFreelancer: false,
      }).select("isReadFreelancer");
      const serviceUserId = req.params;

      var perPage = 10,
        page = Math.max(0, req.params.page);
      await Chat.find({
        freelancerUserId: req.session.user.id,
        serviceUserId: serviceUserId.id,
      })
        .populate({ path: "from", select: "id name" })
        .limit(perPage)
        .skip(perPage * page)
        .sort("time")
        .exec(function (err, chats) {
          for (i = 0; i < chats.length; i++) {
            chats[i].isReadFreelancer = true;
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
    await Chat.create({
      freelancerUserId: req.session.user.id,
      serviceUserId: id,
      from: req.session.user.id,
      to: id,
      message: message,
      isReadFreelancer: true,
    });
    req.flash("alertMessage", "Pesan Terkirim");
    req.flash("alertStatus", "primary");
    res.redirect(`/freelancer/chat/${id}`);
  },

  viewOrder: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "freelancer") {
        level == "admin" ? res.redirect("/admin") : res.redirect("/");
      } else {
        const id = req.session.user.id;
        const unread = await Chat.find({
          freelancerUserId: req.session.user.id,
          isReadFreelancer: false,
        }).select("isReadFreelancer");
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const order = await Freelancer.findOne({ userId: id })
          .select("orderId")
          .populate({
            path: "orderId",
            select: "id orderDate payments total",
          });
        const totalOrder = order.orderId.length;
        res.render("freelancer/order/view_order", {
          title: "View Order | Admin Kerjain",
          user: req.session.user,
          alert,
          unread,
          order,
          totalOrder,
          action: "view",
        });
      }
    } catch (error) {
      res.redirect("/freelancer/dashboard");
    }
  },

  viewDetailOrder: async (req, res) => {
    try {
      const level = req.session.user.level;
      if (level != "freelancer") {
        level == "admin" ? res.redirect("/admin") : res.redirect("/");
      } else {
        const { id } = req.params;
        const unread = await Chat.find({
          freelancerUserId: req.session.user.id,
          isReadFreelancer: false,
        }).select("isReadFreelancer");
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMessage, status: alertStatus };
        const order = await Order.findOne({ _id: id }).populate({
          path: "serviceUserId",
          select: "userId",
        });
        const serviceUser = await User.findOne({
          _id: order.serviceUserId.userId,
        });
        res.render("freelancer/order/view_order", {
          title: "View Order | Admin Kerjain",
          user: req.session.user,
          alert,
          unread,
          order,
          serviceUser,
          action: "detail",
        });
      }
    } catch (error) {
      res.redirect("/freelancer/order");
    }
  },

  actionSendWork: async (req, res) => {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id }).select("work");
    if (fs.existsSync(path.join(`public/${order.work}`))) {
      await fs.unlink(path.join(`public/${order.work}`));
    }
    order.work = `etc/order/work/${req.file.filename}`;
    await order.save();
    req.flash("alertMessage", "Pekerjaan berhasil dikirim");
    req.flash("alertStatus", "primary");
    res.redirect(`/freelancer/order`);
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
      const unread = await Chat.find({
        freelancerUserId: req.session.user.id,
        isReadFreelancer: false,
      }).select("isReadFreelancer");
      const freelancer = await Freelancer.findOne({ userId: id })
        .select(
          "_id title description rating bankName bankAccount accountHolder imgUrl"
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
      if (req.file == undefined) {
        user.name = name;
        user.email = email;
        user.address = address;
        user.phone = phone;
        await user.save();
      } else {
        if (fs.existsSync(path.join(`public/${user.imgUrl}`))) {
          await fs.unlink(path.join(`public/${user.imgUrl}`));
        }
        user.name = name;
        user.email = email;
        user.address = address;
        user.phone = phone;
        user.imgUrl = `images/user/${req.file.filename}`;
        await user.save();
      }
      req.flash("alertMessage", "Data berhasil disimpan");
      req.flash("alertStatus", "primary");
      res.redirect("/freelancer/profile");
    } catch (error) {
      res.redirect("/freelancer/profile");
    }
  },

  actionEditService: async (req, res) => {
    try {
      const { title, description } = req.body;
      const freelancer = await Freelancer.findOne({
        userId: req.session.user.id,
      });
      if (req.file == undefined) {
        freelancer.title = title;
        freelancer.description = description;
        await freelancer.save();
      } else {
        if (fs.existsSync(path.join(`public/${freelancer.imgUrl}`))) {
          await fs.unlink(path.join(`public/${freelancer.imgUrl}`));
        }
        freelancer.title = title;
        freelancer.description = description;
        freelancer.imgUrl = `images/freelancer/${req.file.filename}`;
        await freelancer.save();
      }
      req.flash("alertMessage", "Data berhasil disimpan");
      req.flash("alertStatus", "primary");
      res.redirect("/freelancer/profile");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "primary");
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
};
