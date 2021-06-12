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
      res.status(200).json({ ...freelancer._doc, bank });
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
        return res.status(400).send("You are not service user");

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
        { $match: { categoryId: categoryId.categoryId } },
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

  orderPage: async (req, res) => {
    const {
      serviceId,
      name,
      email,
      phone,
      detailNote,
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
        name,
        email,
        phone,
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

  addReview: async (req, res) => {
    const error = reviewValidation(req.body).error;
    if (error) return res.status(400).send(error.details[0].message);

    const { freelancerId, rating, description } = req.body;

    const serviceUserId = await ServiceUser.findOne({
      userId: req.user.id,
    }).select("_id");

    const review = await Review.create({
      serviceUserId: serviceUserId._id,
      freelancerId: freelancerId,
      rating: rating,
      description: description,
    });

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

  detailChat: async (req, res) => {
    const freelancerId = req.params.freelancerId;
    var perPage = 10;
    await Chat.find({
      serviceUserId: req.user.id,
      freelancerUserId: freelancerId,
    })
      .populate({ path: "from", select: "id name" })
      .limit(perPage)
      .sort("time")
      .exec(function (err, chats) {
        for (i = 0; i < chats.length; i++) {
          chats[i].isReadServiceUser = true;
          chats[i].save(function (err) {
            if (err) {
              console.error("ERROR!");
            }
          });
        }
        Chat.countDocuments({
          freelancerUserId: freelancerId,
          serviceUserId: req.user.id,
        }).exec(function (err, count) {
          res.send({
            chats,
            count,
            perPage,
          });
        });
      });
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
    res.status(201).send({ message: "Success Reply", data });
  },
};
