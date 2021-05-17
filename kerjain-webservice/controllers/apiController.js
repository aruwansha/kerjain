const Category = require("../models/category");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Service = require("../models/service");
const Order = require("../models/order");
const Chat = require("../models/chat");
const mongoose = require("mongoose");

const { registerValidation, loginValidation } = require("../validator.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPicked = await Freelancer.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            totalOrder: {
              $cond: {
                if: { $isArray: "$orderId" },
                then: { $size: "$orderId" },
                else: "NA",
              },
            },
            rating: 1,
            imgUrl: 1,
          },
        },
        {
          $sort: { totalOrder: -1 },
        },
        {
          $limit: 4,
        },
      ]);

      const highRated = await Freelancer.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            rating: 1,
            imgUrl: 1,
          },
        },
        {
          $sort: { rating: -1 },
        },
        {
          $limit: 4,
        },
      ]);

      res.status(200).json({ mostPicked, highRated });
    } catch (error) {}
  },

  categoryPage: async (req, res) => {
    const Technology = await Freelancer.find({
      categoryId: "605b580db4a8e60af44d4530",
    })
      .select("id rating title imgUrl")
      .populate({ path: "userId", select: "id name imgUrl" });
    const Design = await Freelancer.find({
      categoryId: "605b580db4a8e60af44d4531",
    })
      .select("id rating title imgUrl")
      .populate({ path: "userId", select: "id name imgUrl" });
    const Writing = await Freelancer.find({
      categoryId: "605b580db4a8e60af44d4532",
    })
      .select("id rating title imgUrl")
      .populate({ path: "userId", select: "id name imgUrl" });
    const Video = await Freelancer.find({
      categoryId: "605b580db4a8e60af44d4533",
    })
      .select("id rating title imgUrl")
      .populate({ path: "userId", select: "id name imgUrl" });

    res.status(200).json({ Technology, Design, Writing, Video });
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const freelancer = await Freelancer.findOne({
        _id: id,
      })
        .select("id title description rating imgUrl")
        .populate({ path: "userId", select: "name imgUrl" })
        .populate({
          path: "serviceId._id",
          select: ["title", "description", "price", "imgUrl"],
        })
        .exec();
      res.status(200).json({ freelancer });
    } catch (error) {}
  },

  register: async (req, res) => {
    try {
      const error = registerValidation(req.body).error;
      if (error) return res.send(error.details[0].message);

      const emailExists = await User.findOne({
        email: req.body.email.toLowerCase(),
      });
      if (emailExists) return res.status(400).send("Email already taken");

      const { name, email, password, birthdate, address, phone, categoryId } =
        req.body;
      const createUser = await User.create({
        name,
        email,
        password,
        level: "service_user",
        birthdate,
        address,
        phone,
      });

      // get selected category
      const category = await Category.findOne({ _id: categoryId });

      // create serviceUser
      const createServiceUser = await ServiceUser.create({
        userId: createUser._id,
        categoryId: categoryId,
      });

      // push serviceUserId to category schema
      category.serviceUserId.push({ _id: createServiceUser._id });
      await category.save();
      const token = jwt.sign({ id: createUser._id }, process.env.TOKEN_SECRET, {
        expiresIn: 3600,
      });
      res.status(200).send({ auth: true, token: token });
    } catch (error) {
      res.send({ error });
    }
  },

  login: async (req, res) => {
    try {
      const error = loginValidation(req.body).error;
      if (error) return res.send(error.details[0].message);

      const user = await User.findOne({ email: req.body.email.toLowerCase() });

      if (!user) return res.status(400).send("Email or password is wrong");

      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch)
        return res.status(400).send("Email or password is wrong");
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 3600,
      });
      res.status(200).send({ auth: true, token: token });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  me: (req, res) => {
    res.status(200).json(req.user);
  },

  orderPage: async (req, res) => {
    const { serviceId, detailNote, accountHolder, bankFrom } = req.body;
    if (!req.file) {
      return res.status(404).json({ message: "image not found" });
    }

    if (
      serviceId === undefined ||
      detailNote === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ) {
      res.status(404).json({ message: "Field is required" });
    } else {
      const service = await Service.findOne({ _id: serviceId });
      const invoice = Math.floor(1000000 + Math.random() * 9000000);
      const tax = service.price * 0.1;

      // get service user id
      const serviceUserId = await ServiceUser.findOne({
        userId: req.user.id,
      }).select("_id");

      const newOrder = {
        freelancerId: service.freelancerId,
        serviceUserId: serviceUserId._id,
        invoice,
        serviceId: {
          _id: service.id,
          title: service.title,
          price: service.price,
        },
        total: service.price + tax,
        detailNote,
        payments: {
          proofPayment: `images/order/${req.file.filename}`,
          accountHolder,
          bankFrom,
        },
      };

      const order = await Order.create(newOrder);

      const freelancer = await Freelancer.findOne({
        _id: service.freelancerId,
      });

      // send detail to freelancer
      await Chat.create({
        freelancerUserId: freelancer.userId,
        serviceUserId: req.user.id,
        from: req.user.id,
        to: freelancer.userId,
        message: detailNote,
        isReadServiceUser: true,
      });

      freelancer.orderId.push({ _id: order._id });
      freelancer.save();

      res.status(201).json({ message: "Success Booking", order });
    }
  },

  chats: async (req, res) => {
    const id = req.user.id;
    const chats = await Chat.aggregate([
      { $match: { serviceUserId: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "freelancerUserId",
          foreignField: "_id",
          as: "freelancerUserId",
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
          _id: "$freelancerUserId",
          doc: { $first: "$$ROOT" },
        },
      },
      {
        $project: {
          "_id._id": 1,
          "doc._id": 1,
          "doc.isRead": 1,
          "doc.time": 1,
          "doc.freelancerUserId._id": 1,
          "doc.freelancerUserId.name": 1,
          "doc.serviceUserId": 1,
          "doc.from._id": 1,
          "doc.from.name": 1,
          "doc.to": 1,
          "doc.message": 1,
          "doc.__v": 1,
        },
      },
    ]);
    if (chats == "") return res.send({ message: "no chat yet" });
    res.status(200).send({ chats });
  },

  replyChat: async (req, res) => {
    const freelancerId = req.params.freelancerId;
    const serviceUserId = req.user.id;
    const data = await Chat.create({
      freelancerUserId: freelancerId,
      serviceUserId: serviceUserId,
      from: serviceUserId,
      to: freelancerId,
      message: req.body.message,
      isReadServiceUser: true,
    });
    if (!data) return res.send({ message: "Failed to reply!" });
    res.send({ message: "Success Reply", data });
  },


};
