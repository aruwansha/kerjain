const Category = require("../models/category");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Service = require("../models/service");
const Request = require("../models/request");
const RequestBid = require("../models/request_bid");
const Order = require("../models/order");
const Chat = require("../models/chat");

const fs = require("fs-extra");
const path = require("path");

module.exports = {
  register: async (req, res) => {
    const emailExists = await User.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (emailExists) return res.status(400).send("Email already taken");

    const { firstname, lastname, email, password, categoryId } = req.body;
    if (
      firstname === undefined ||
      lastname === undefined ||
      email === undefined ||
      password === undefined ||
      categoryId === undefined
    ) {
      res.status(400).send({ message: "Tolong lengkapi field" });
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
      res.status(201).send({
        message: "Berhasil Mendaftar, Tunggu konfirmasi admin untuk bisa login",
      });
    }
  },

  getDashboard: async (req, res) => {
    const id = req.user.id;
    const order = await Freelancer.findOne({ userId: id })
      .select("_id")
      .populate({ select: "id", path: "orderId" });
    const freelancer = await Freelancer.findOne({
      userId: id,
    }).select("_id");
    const service = await Service.find({ freelancerId: freelancer._id }).select(
      "_id"
    );
    const unread = await Chat.find({
      freelancerUserId: id,
      isReadFreelancer: false,
    }).select("isReadFreelancer");
    res.send({
      total_order: order.orderId.length,
      total_service: service.length,
    });
  },

  getServices: async (req, res) => {
    const id = req.user.id;
    const unread = await Chat.find({
      freelancerUserId: id,
      isReadFreelancer: false,
    }).select("isReadFreelancer");
    const freelancer = await Freelancer.findOne({ userId: id }).select("_id");
    const service = await Service.find({ freelancerId: freelancer._id });
    res.status(200).send(service);
  },

  postService: async (req, res) => {
    const userId = req.user.id;
    const { title, description, price } = req.body;
    const freelancer = await Freelancer.findOne({
      userId: userId,
    });

    const service = await Service.find({ freelancerId: freelancer._id });

    if (service.length < 3) {
      const newService = await Service.create({
        freelancerId: freelancer._id,
        title,
        description,
        price,
        imgUrl: `images/service/${req.file.filename}`,
      });

      freelancer.serviceId.push({ _id: newService._id });
      freelancer.save();
      res.status(201).send({ message: "Berhasil menambah data" });
    } else {
      res.status(200).send({ message: "Layanan sudah penuh" });
    }
  },

  putService: async (req, res) => {
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
    res.status(200).send({ message: "Data berhasil diperbaharui" });
  },

  deleteService: async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const service = await Service.findOne({ _id: id });
    if (fs.existsSync(path.join(`public/${service.imgUrl}`))) {
      await fs.unlink(path.join(`public/${service.imgUrl}`));
    }
    const freelancer = await Freelancer.findOne({
      userId: userId,
    });

    await Freelancer.updateOne(
      { _id: freelancer._id },
      { $pull: { serviceId: { _id: service._id } } }
    );

    await service.remove();
    res.status(203).send({ message: "Data berhasil dihapus" });
  },

  getRequests: async (req, res) => {
    const id = req.user.id;
    const unread = await Chat.find({
      freelancerUserId: id,
      isReadFreelancer: false,
    }).select("isReadFreelancer");

    const freelancer = await Freelancer.findOne({
      userId: id,
    }).select("categoryId");
    const mongoose = require("mongoose");
    const request = await Request.aggregate([
      {
        $match: {
          categoryId: mongoose.Types.ObjectId(freelancer.categoryId),
        },
      },
      {
        $lookup: {
          from: "serviceusers",
          localField: "serviceUserId",
          foreignField: "_id",
          as: "serviceUserId",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "serviceUserId.userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "serviceUserId._id",
          foreignField: "serviceUserId",
          as: "orderer",
        },
      },
      {
        $project: {
          status: "$orderer.payments",
          "userId.name": 1,
          requestSubject: 1,
          requestDescription: 1,
          requestBudget: 1,
          finalBudget: 1,
          freelancerId: 1,
        },
      },
    ]);
    res.status(200).send(request);
  },

  getRequest: async (req, res) => {
    const userId = req.user.id;
    const unread = await Chat.find({
      freelancerUserId: userId,
      isReadFreelancer: false,
    }).select("isReadFreelancer");
    const { id } = req.params;
    const freelancerId = await Freelancer.findOne({ userId: userId }).select(
      "id"
    );
    const request = await Request.findOne({ _id: id });
    const serviceUser = await ServiceUser.findOne({
      _id: request.serviceUserId,
    })
      .select("id")
      .populate({ path: "userId", select: "name email phone" });

    const requestBid = await RequestBid.findOne({
      requestId: id,
      freelancerId: freelancerId._id,
    });

    res.status(200).send({
      request: request,
      service_user: serviceUser,
      request_bid: requestBid,
    });
  },

  postBid: async (req, res) => {
    const userId = req.user.id;
    const { nominal, id } = req.body;

    const user = await User.findOne({ _id: userId }).select("name");

    const freelancerId = await Freelancer.findOne({
      userId: userId,
    }).select("_id");

    await RequestBid.create({
      requestId: id,
      freelancerId: freelancerId._id,
      name: user.name,
      bid: nominal,
    });
    res.status(201).send({ message: "Berhasil mengikuti bid" });
  },

  putBid: async (req, res) => {
    const { nominal, id } = req.body;
    const newRequestBid = await RequestBid.findOne({ _id: id });
    newRequestBid.bid = nominal;
    newRequestBid.save();
    res.status(200).send({ message: "Berhasil merubah bid" });
  },

  getChats: async (req, res) => {
    const userId = req.user.id;
    const unread = await Chat.find({
      freelancerUserId: userId,
      isReadFreelancer: false,
    }).select("isReadFreelancer");
    const mongoose = require("mongoose");
    const chats = await Chat.aggregate([
      {
        $match: {
          freelancerUserId: mongoose.Types.ObjectId(userId),
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
      { $sort: { "doc.time": -1 } },
      {
        $project: {
          "_id._id": 1,
          "doc._id": 1,
          "doc.isReadFreelancer": 1,
          "doc.isReadServiceUser": 1,
          "doc.time": 1,
          "doc.freelancerUserId": 1,
          "doc.serviceUserId._id": 1,
          "doc.serviceUserId.name": 1,
          "doc.from._id": 1,
          "doc.from.name": 1,
          "doc.to": 1,
          "doc.message": 1,
          "doc.__v": 1,
        },
      },
    ]);
    res.status(200).send({
      chats,
    });
  },

  deleteChats: async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const filter = {
      serviceUserId: id,
      freelancerUserId: userId,
    };
    await Chat.deleteMany(filter);
    res.status(203).send({ message: "Chat telah terhapus" });
  },

  getChat: async (req, res) => {
    const userId = req.user.id;
    const unread = await Chat.find({
      freelancerUserId: userId,
      isReadFreelancer: false,
    }).select("isReadFreelancer");
    const serviceUserId = req.params.id;

    const chat = await Chat.find({
      freelancerUserId: userId,
      serviceUserId: serviceUserId,
    })
      .populate({ path: "from", select: "id name" })
      .sort("time");
    res.send(chat);
  },

  deleteChat: async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findOne({ _id: id });
    await chat.remove();
    res.status(203).send({ message: "Chat telah terhapus" });
  },

  postChat: async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { message } = req.body;
    await Chat.create({
      freelancerUserId: userId,
      serviceUserId: id,
      from: userId,
      to: id,
      message: message,
      isReadFreelancer: true,
    });
    res.status(201).send({ message: "Berhasil mengirim chat" });
  },

  getOrders: async (req, res) => {
    const userId = req.user.id;
    const unread = await Chat.find({
      freelancerUserId: userId,
      isReadFreelancer: false,
    }).select("isReadFreelancer");
    const order = await Freelancer.findOne({ userId: userId })
      .select("orderId")
      .populate({
        path: "orderId",
        select: "id orderDate payments total",
      });
    const totalOrder = order.orderId.length;
    res.status(200).send(order);
  },

  getOrder: async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const unread = await Chat.find({
      freelancerUserId: userId,
      isReadFreelancer: false,
    }).select("isReadFreelancer");
    const order = await Order.findOne({ _id: id })
      .populate({
        path: "serviceUserId",
        select: "userId",
      })
      .populate({
        path: "serviceId",
        select: "title price description",
      })
      .populate({
        path: "requestId",
        select: "requestSubject requestDescription finalBudget",
      });
    const serviceUser = await User.findOne({
      _id: order.serviceUserId.userId,
    });
    res.status(200).send({ order, serviceUser });
  },

  sendProofWork: async (req, res) => {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id }).select("work");
    if (fs.existsSync(path.join(`public/${order.imgUrl}`))) {
      await fs.unlink(path.join(`public/${order.imgUrl}`));
    }
    order.work = `images/order/proof_work/${req.file.filename}`;
    await order.save();
    res.status(200).send({ message: "Bukti pengerjaan sudah dikirim" });
  },

  getProfile: async (req, res) => {
    const userId = req.user.id;
    const unread = await Chat.find({
      freelancerUserId: userId,
      isReadFreelancer: false,
    }).select("isReadFreelancer");
    const freelancer = await Freelancer.findOne({ userId: userId })
      .select(
        "_id title description rating bankName bankAccount accountHolder imgUrl"
      )
      .populate("userId")
      .populate({ path: "categoryId", select: "id name" });
    res.status(200).send(freelancer);
  },

  putPersonalData: async (req, res) => {
    const userId = req.user.id;
    const { firstname, lastname, email, address, phone } = req.body;
    const user = await User.findOne({ _id: userId });
    if (req.file == undefined) {
      user.name = `${firstname} ${lastname}`;
      user.email = email;
      user.address = address;
      user.phone = phone;
      await user.save();
    } else {
      if (fs.existsSync(path.join(`public/${user.imgUrl}`))) {
        await fs.unlink(path.join(`public/${user.imgUrl}`));
      }
      user.name = `${firstname} ${lastname}`;
      user.email = email;
      user.address = address;
      user.phone = phone;
      user.imgUrl = `images/user/${req.file.filename}`;
      await user.save();
    }
    res.status(200).send({ message: "Data berhasil diperbaharui" });
  },

  putServiceData: async (req, res) => {
    const userId = req.user.id;
    const { title, description } = req.body;
    const freelancer = await Freelancer.findOne({
      userId: userId,
    });
    if (req.file == undefined) {
      freelancer.title = title;
      freelancer.description = description;
      await freelancer.save();
      res.status(200).send({ message: "Data berhasil diperbaharui" });
    } else {
      if (fs.existsSync(path.join(`public/${freelancer.imgUrl}`))) {
        await fs.unlink(path.join(`public/${freelancer.imgUrl}`));
      }
      freelancer.title = title;
      freelancer.description = description;
      freelancer.imgUrl = `images/freelancer/${req.file.filename}`;
      freelancer.isActive = true;
      await freelancer.save();
      res.status(200).send({ message: "Data berhasil diperbaharui" });
    }
  },

  putBankData: async (req, res) => {
    const userId = req.user.id;
    const { bankName, bankAccount, accountHolder } = req.body;
    const freelancer = await Freelancer.findOne({
      userId: userId,
    });
    freelancer.bankName = bankName;
    freelancer.bankAccount = bankAccount;
    freelancer.accountHolder = accountHolder;
    await freelancer.save();
    res.status(200).send({ message: "Data berhasil diperbaharui" });
  },

  putPassword: async (req, res) => {
    const userId = req.user.id;
    const { old_password, new_password } = req.body;
    const user = await User.findOne({ _id: userId });
    const isPasswordMatch = await bcrypt.compare(old_password, user.password);

    if (!isPasswordMatch) {
      req.flash("alertMessage", "password lama salah");
      req.flash("alertStatus", "danger");
      res.status.send("Password lama salah");
    } else {
      user.password = new_password;
      await user.save();
      res.status(200).send("Password berhasil diperbaharui");
    }
  },
};
