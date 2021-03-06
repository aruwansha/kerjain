const Category = require("../models/category");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Service = require("../models/service");
const Order = require("../models/order");
const Chat = require("../models/chat");
const Bank = require("../models/bank");
const Review = require("../models/review");
const Request = require("../models/request");

const mongoose = require("mongoose");

const {
  registerValidation,
  loginValidation,
  requestValidation,
  reviewValidation,
} = require("../validator.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const mostPicked = await Freelancer.aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "serviceId._id",
            foreignField: "_id",
            as: "serviceId",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "freelancerId",
            as: "reviews",
          },
        },
        { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            ratingLength: { $size: "$reviews" },
            ratingTotal: { $sum: "$reviews.rating" },
            _id: 1,
            tes: 1,
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
            imgUrl: 1,
            startFrom: {
              $cond: {
                if: { $isArray: "$serviceId" },
                then: { $min: "$serviceId.price" },
                else: "NA",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            tes: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            totalOrder: 1,
            imgUrl: 1,
            startFrom: 1,
            rating: {
              $cond: {
                if: { $eq: ["$ratingTotal", 0] },
                then: 0,
                else: { $divide: ["$ratingTotal", "$ratingLength"] },
              },
            },
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
          $match: {
            isActive: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "serviceId._id",
            foreignField: "_id",
            as: "serviceId",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "freelancerId",
            as: "reviews",
          },
        },
        { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            ratingLength: { $size: "$reviews" },
            ratingTotal: { $sum: "$reviews.rating" },
            _id: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            rating: 1,
            imgUrl: 1,
            startFrom: {
              $cond: {
                if: { $isArray: "$serviceId" },
                then: { $min: "$serviceId.price" },
                else: "NA",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            tes: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            totalOrder: 1,
            imgUrl: 1,
            startFrom: 1,
            rating: {
              $cond: {
                if: { $eq: ["$ratingTotal", 0] },
                then: 0,
                else: { $divide: ["$ratingTotal", "$ratingLength"] },
              },
            },
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
    const Technology = await Freelancer.aggregate([
      {
        $match: {
          isActive: true,
          categoryId: mongoose.Types.ObjectId("605b580db4a8e60af44d4530"),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceId._id",
          foreignField: "_id",
          as: "serviceId",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "freelancerId",
          as: "reviews",
        },
      },
      { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          ratingLength: { $size: "$reviews" },
          ratingTotal: { $sum: "$reviews.rating" },
          _id: 1,
          title: 1,
          "userId.name": 1,
          "userId.imgUrl": 1,
          rating: 1,
          imgUrl: 1,
          startFrom: {
            $cond: {
              if: { $isArray: "$serviceId" },
              then: { $min: "$serviceId.price" },
              else: "NA",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          tes: 1,
          title: 1,
          "userId.name": 1,
          "userId.imgUrl": 1,
          totalOrder: 1,
          imgUrl: 1,
          startFrom: 1,
          rating: {
            $cond: {
              if: { $eq: ["$ratingTotal", 0] },
              then: 0,
              else: { $divide: ["$ratingTotal", "$ratingLength"] },
            },
          },
        },
      },
      {
        $limit: 4,
      },
    ]);

    const Design = await Freelancer.aggregate([
      {
        $match: {
          isActive: true,
          categoryId: mongoose.Types.ObjectId("605b580db4a8e60af44d4531"),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceId._id",
          foreignField: "_id",
          as: "serviceId",
        },
      },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "freelancerId",
          as: "reviews",
        },
      },
      { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          ratingLength: { $size: "$reviews" },
          ratingTotal: { $sum: "$reviews.rating" },
          _id: 1,
          title: 1,
          "userId.name": 1,
          "userId.imgUrl": 1,
          rating: 1,
          imgUrl: 1,
          startFrom: {
            $cond: {
              if: { $isArray: "$serviceId" },
              then: { $min: "$serviceId.price" },
              else: "NA",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          tes: 1,
          title: 1,
          "userId.name": 1,
          "userId.imgUrl": 1,
          totalOrder: 1,
          imgUrl: 1,
          startFrom: 1,
          rating: {
            $cond: {
              if: { $eq: ["$ratingTotal", 0] },
              then: 0,
              else: { $divide: ["$ratingTotal", "$ratingLength"] },
            },
          },
        },
      },
      {
        $limit: 4,
      },
    ]);

    const Writing = await Freelancer.aggregate([
      {
        $match: {
          isActive: true,
          categoryId: mongoose.Types.ObjectId("605b580db4a8e60af44d4532"),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceId._id",
          foreignField: "_id",
          as: "serviceId",
        },
      },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "freelancerId",
          as: "reviews",
        },
      },
      { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          ratingLength: { $size: "$reviews" },
          ratingTotal: { $sum: "$reviews.rating" },
          _id: 1,
          title: 1,
          "userId.name": 1,
          "userId.imgUrl": 1,
          rating: 1,
          imgUrl: 1,
          startFrom: {
            $cond: {
              if: { $isArray: "$serviceId" },
              then: { $min: "$serviceId.price" },
              else: "NA",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          tes: 1,
          title: 1,
          "userId.name": 1,
          "userId.imgUrl": 1,
          totalOrder: 1,
          imgUrl: 1,
          startFrom: 1,
          rating: {
            $cond: {
              if: { $eq: ["$ratingTotal", 0] },
              then: 0,
              else: { $divide: ["$ratingTotal", "$ratingLength"] },
            },
          },
        },
      },
      {
        $limit: 4,
      },
    ]);

    const Video = await Freelancer.aggregate([
      {
        $match: {
          isActive: true,
          categoryId: mongoose.Types.ObjectId("605b580db4a8e60af44d4533"),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceId._id",
          foreignField: "_id",
          as: "serviceId",
        },
      },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "freelancerId",
          as: "reviews",
        },
      },
      { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          ratingLength: { $size: "$reviews" },
          ratingTotal: { $sum: "$reviews.rating" },
          _id: 1,
          title: 1,
          "userId.name": 1,
          "userId.imgUrl": 1,
          rating: 1,
          imgUrl: 1,
          startFrom: {
            $cond: {
              if: { $isArray: "$serviceId" },
              then: { $min: "$serviceId.price" },
              else: "NA",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          tes: 1,
          title: 1,
          "userId.name": 1,
          "userId.imgUrl": 1,
          totalOrder: 1,
          imgUrl: 1,
          startFrom: 1,
          rating: {
            $cond: {
              if: { $eq: ["$ratingTotal", 0] },
              then: 0,
              else: { $divide: ["$ratingTotal", "$ratingLength"] },
            },
          },
        },
      },
      {
        $limit: 4,
      },
    ]);

    res.status(200).json({
      categories: [
        { name: "Teknologi & Pemrograman", data: Technology },
        { name: "Desain & Grafis", data: Design },
        { name: "Tulis & Terjemahan", data: Writing },
        { name: "Video & Animasi", data: Video },
      ],
    });
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
      const bank = await Bank.find();
      const review = await Review.aggregate([
        {
          $match: {
            freelancerId: mongoose.Types.ObjectId(id),
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
          $project: {
            "userId.name": 1,
            description: 1,
            rating: 1,
          },
        },
      ]);

      res.status(200).json({ ...freelancer._doc, bank, review });
    } catch (error) {}
  },

  register: async (req, res) => {
    try {
      const error = registerValidation(req.body).error;
      if (error) return res.status(400).send(error.details[0].message);

      const emailExists = await User.findOne({
        email: req.body.email.toLowerCase(),
      });
      if (emailExists) return res.status(400).send("Email already taken");

      const { name, email, password, categoryId } = req.body;
      const createUser = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        level: "service_user",
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
      res.status(201).send({
        message: "Success Register",
        data: { name: createUser.name, email: createUser.email, token: token },
      });
    } catch (error) {
      res.send({ error });
    }
  },

  login: async (req, res) => {
    try {
      const error = loginValidation(req.body).error;
      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findOne({ email: req.body.email.toLowerCase() });

      if (!user) return res.status(400).send("Email or password is wrong");

      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordMatch)
        return res.status(400).send("Email or password is wrong");

      if (user.level != "service_user")
        return res.status(200).send({
          message: "Maaf anda bukan service user",
          meta: {},
        });

      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 3600,
      });
      res.status(200).send({
        message: "Success Login",
        data: { name: user.name, token: token },
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  me: async (req, res) => {
    try {
      const mostPicked = await Freelancer.aggregate([
        {
          $match: {
            isActive: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "serviceId._id",
            foreignField: "_id",
            as: "serviceId",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "freelancerId",
            as: "reviews",
          },
        },
        { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            ratingLength: { $size: "$reviews" },
            ratingTotal: { $sum: "$reviews.rating" },
            _id: 1,
            tes: 1,
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
            imgUrl: 1,
            startFrom: {
              $cond: {
                if: { $isArray: "$serviceId" },
                then: { $min: "$serviceId.price" },
                else: "NA",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            tes: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            totalOrder: 1,
            imgUrl: 1,
            startFrom: 1,
            rating: {
              $cond: {
                if: { $eq: ["$ratingTotal", 0] },
                then: 0,
                else: { $divide: ["$ratingTotal", "$ratingLength"] },
              },
            },
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
          $match: {
            isActive: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "serviceId._id",
            foreignField: "_id",
            as: "serviceId",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "freelancerId",
            as: "reviews",
          },
        },
        { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            ratingLength: { $size: "$reviews" },
            ratingTotal: { $sum: "$reviews.rating" },
            _id: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            rating: 1,
            imgUrl: 1,
            startFrom: {
              $cond: {
                if: { $isArray: "$serviceId" },
                then: { $min: "$serviceId.price" },
                else: "NA",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            tes: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            totalOrder: 1,
            imgUrl: 1,
            startFrom: 1,
            rating: {
              $cond: {
                if: { $eq: ["$ratingTotal", 0] },
                then: 0,
                else: { $divide: ["$ratingTotal", "$ratingLength"] },
              },
            },
          },
        },
        {
          $sort: { rating: -1 },
        },
        {
          $limit: 4,
        },
      ]);

      const categoryId = await ServiceUser.findOne({
        userId: req.user.id,
      }).select("categoryId");
      const category = await Freelancer.aggregate([
        {
          $match: {
            isActive: true,
            categoryId: categoryId.categoryId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {
          $lookup: {
            from: "services",
            localField: "serviceId._id",
            foreignField: "_id",
            as: "serviceId",
          },
        },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "freelancerId",
            as: "reviews",
          },
        },
        { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            ratingLength: { $size: "$reviews" },
            ratingTotal: { $sum: "$reviews.rating" },
            _id: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            rating: 1,
            imgUrl: 1,
            startFrom: {
              $cond: {
                if: { $isArray: "$serviceId" },
                then: { $min: "$serviceId.price" },
                else: "NA",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            tes: 1,
            title: 1,
            "userId.name": 1,
            "userId.imgUrl": 1,
            totalOrder: 1,
            imgUrl: 1,
            startFrom: 1,
            rating: {
              $cond: {
                if: { $eq: ["$ratingTotal", 0] },
                then: 0,
                else: { $divide: ["$ratingTotal", "$ratingLength"] },
              },
            },
          },
        },
        {
          $sort: { rating: -1 },
        },
        {
          $limit: 4,
        },
      ]);

      res.status(200).json({ mostPicked, highRated, category });
    } catch (error) {}
  },

  orderService: async (req, res) => {
    const {
      serviceId,
      name,
      email,
      phone,
      detailNote,
      total,
      accountHolder,
      bankFrom,
    } = req.body;
    if (!req.file) {
      return res.status(404).json({ message: "image not found" });
    }

    if (
      serviceId === undefined ||
      name === undefined ||
      email === undefined ||
      phone === undefined ||
      detailNote === undefined ||
      total === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ) {
      res.status(404).json({ message: "Field is required" });
    } else {
      const service = await Service.findOne({ _id: serviceId });
      const invoice = Math.floor(1000000 + Math.random() * 9000000);

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
        total,
        name,
        email,
        phone,
        detailNote,
        payments: {
          proofPayment: `images/order/proof_payment/${req.file.filename}`,
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

  orderRequest: async (req, res) => {
    const {
      requestId,
      name,
      email,
      phone,
      detailNote,
      total,
      accountHolder,
      bankFrom,
    } = req.body;
    if (!req.file) {
      return res.status(404).json({ message: "image not found" });
    }

    if (
      requestId === undefined ||
      name === undefined ||
      email === undefined ||
      phone === undefined ||
      detailNote === undefined ||
      total === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ) {
      res.status(404).json({ message: "Field is required" });
    } else {
      const request = await Request.findOne({ _id: requestId });
      const invoice = Math.floor(1000000 + Math.random() * 9000000);

      // get service user id
      const serviceUserId = await ServiceUser.findOne({
        userId: req.user.id,
      }).select("_id");

      const newOrder = {
        freelancerId: request.freelancerId,
        serviceUserId: serviceUserId._id,
        invoice,
        requestId: request.id,
        total,
        name,
        email,
        phone,
        detailNote,
        payments: {
          proofPayment: `images/order/proof_payment/${req.file.filename}`,
          accountHolder,
          bankFrom,
        },
      };

      const order = await Order.create(newOrder);

      const freelancer = await Freelancer.findOne({
        _id: request.freelancerId,
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

  getOrder: async (req, res) => {
    const userId = req.user.id;
    const serviceUserId = await ServiceUser.findOne({ userId: userId }).select(
      "_id"
    );

    const order = await Order.find({ serviceUserId: serviceUserId._id })
      .populate({ path: "serviceId", select: "title" })
      .populate({ path: "requestId", select: "requestSubject" });

    res.send(order);
  },

  getOrderDetail: async (req, res) => {
    const id = req.params.id;

    const order = await Order.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
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
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $lookup: {
          from: "requests",
          localField: "requestId",
          foreignField: "_id",
          as: "request",
        },
      },
      {
        $project: {
          freelancerId: 1,
          payments: 1,
          orderDate: 1,
          invoice: 1,
          work: 1,
          "userId.name": 1,
          "service.title": 1,
          "request.requestSubject": 1,
          serviceId: 1,
          name: 1,
          email: 1,
          phone: 1,
          detailNote: 1,
          total: 1,
          isReviewed: 1,
        },
      },
    ]);

    res.send(order);
  },

  confirmOrder: async (req, res) => {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId });
    order.payments.status = "finished";
    await order.save();
    res.send({ message: "order is done, thank's for your confirmation" });
  },

  addRequest: async (req, res) => {
    const error = requestValidation(req.body).error;
    if (error) return res.status(400).send(error.details[0].message);

    const { categoryId, requestSubject, requestDescription, requestBudget } =
      req.body;

    const serviceUserId = await ServiceUser.findOne({
      userId: req.user.id,
    }).select("_id");

    const newRequest = await Request.create({
      serviceUserId: serviceUserId._id,
      categoryId: categoryId,
      requestSubject: requestSubject,
      requestDescription: requestDescription,
      requestBudget: requestBudget,
    });

    res
      .status(201)
      .send({ messages: "Successfully made request", data: newRequest });
  },

  getRequest: async (req, res) => {
    const userId = req.user.id;
    const serviceUserId = await ServiceUser.findOne({ userId: userId }).select(
      "_id"
    );

    const request = await Request.find({ serviceUserId: serviceUserId._id });

    res.send(request);
  },

  getDetailRequest: async (req, res) => {
    const id = req.params.id;

    const request = await Request.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
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
          from: "requestbids",
          localField: "_id",
          foreignField: "requestId",
          as: "requestBidId",
        },
      },
      {
        $lookup: {
          from: "freelancers",
          localField: "requestBidId.freelancerId",
          foreignField: "_id",
          as: "freelancers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "freelancers.userId",
          foreignField: "_id",
          as: "freelancer",
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "freelancers._id",
          foreignField: "freelancerId",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "requestId",
          as: "request",
        },
      },
      {
        $project: {
          freelancerId: 1,
          requestDate: 1,
          requestSubject: 1,
          requestDescription: 1,
          requestBudget: 1,
          finalBudget: 1,
          "userId.name": 1,
          "request.requestId": 1,
          requestBidId: 1,
          "freelancer.name": 1,
          ratingLength: { $size: "$reviews" },
          ratingTotal: { $sum: "$reviews.rating" },
        },
      },
      {
        $project: {
          freelancerId: 1,
          requestDate: 1,
          requestSubject: 1,
          requestDescription: 1,
          requestBudget: 1,
          finalBudget: 1,
          "userId.name": 1,
          "request.requestId": 1,
          requestBidId: 1,
          "freelancer.name": 1,
          rating: {
            $cond: {
              if: { $eq: ["$ratingTotal", 0] },
              then: 0,
              else: { $divide: ["$ratingTotal", "$ratingLength"] },
            },
          },
        },
      },
    ]);

    const bank = await Bank.find();

    res.send({ request, bank });
  },

  chooseFreelancer: async (req, res) => {
    const id = req.params.id;

    const request = await Request.findOne({ _id: id });

    request.freelancerId = req.body.freelancerId;
    request.finalBudget = req.body.finalBudget;
    request.save();

    res.send(request);
  },

  getReview: async (req, res) => {
    const userId = req.user.id;
    const serviceUserId = await ServiceUser.findOne({ userId: userId }).select(
      "_id"
    );

    const review = await Review.find({ serviceUserId: serviceUserId._id });

    res.send(review);
  },

  addReview: async (req, res) => {
    const error = reviewValidation(req.body).error;
    if (error) return res.status(400).send(error.details[0].message);

    const freelancerId = req.params.id;

    const { orderId, rating, description } = req.body;

    const serviceUserId = await ServiceUser.findOne({
      userId: req.user.id,
    }).select("_id");

    const review = await Review.create({
      serviceUserId: serviceUserId._id,
      freelancerId: freelancerId,
      rating: rating,
      description: description,
    });

    const filter = { _id: orderId };
    await Order.updateOne(filter, { isReviewed: true });

    res.status(201).json({ message: "Success Add Review", review });
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
          "doc.isReadFreelancer": 1,
          "doc.isReadServiceUser": 1,
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

  deleteAllChat: async (req, res) => {
    const serviceUserId = req.user.id;
    const freelancerUserId = req.params.id;
    const filter = {
      serviceUserId: serviceUserId,
      freelancerUserId: freelancerUserId,
    };
    await Chat.deleteMany(filter);
    res.status(202).send({ message: "all chats deleted successfully" });
  },

  detailChat: async (req, res) => {
    const freelancerId = req.params.id;
    const chat = await Chat.find({
      serviceUserId: req.user.id,
      freelancerUserId: freelancerId,
    })
      .populate({ path: "from", select: "id name" })
      .sort("time");
    res.send(chat);
  },

  deleteChat: async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findOne({ _id: id });
    await chat.remove();
    res.status.send({ message: "chat deleted successfully" });
  },

  addChat: async (req, res) => {
    const freelancerId = req.params.id;
    const serviceUserId = req.user.id;
    const data = await Chat.create({
      freelancerUserId: freelancerId,
      serviceUserId: serviceUserId,
      from: serviceUserId,
      to: freelancerId,
      message: req.body.message,
      isReadServiceUser: true,
    });
    if (!data) return res.send({ message: "Failed to add chat!" });
    res.status(201).send({ message: "Success Reply", data });
  },

  getProfile: async (req, res) => {
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).send(user);
  },
  
  editProfile: async (req, res) => {
    const { name, email, address, phone } = req.body;
    const user = await User.findOne({ _id: req.user.id });

    user.name = name;
    user.email = email;
    user.address = address;
    user.phone = phone;
    const save = await user.save();
    if (!save)
      return res.status(400).send({ message: "Failed to edit profile" });
    res.status(201).send({ message: "Success Edit Profile" });
  },
};
