const Category = require("../models/category");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Service = require("../models/service");
const Order = require("../models/order");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  register: async (req, res) => {
    try {
      // get request body from page
      const { name, email, password, birthdate, address, phone, categoryId } =
        req.body;
      // create user in db
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
      const token = jwt.sign({ id: createUser._id }, config.secret, {
        expiresIn: 3600,
      });
      res.status(200).send({ auth: true, token: token });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch)
        return res.status(401).send({ auth: false, token: null });
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 3600,
      });
      res.status(200).send({ auth: true, token: token });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  me: (req, res) => {
    res.status(200).json(req.user);
  },

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
    const programTech = await Freelancer.find({
      categoryId: "605b580db4a8e60af44d4530",
    })
      .select("id rating title imgUrl")
      .populate({ path: "userId", select: "id name imgUrl" });
    const designGraphic = await Freelancer.find({
      categoryId: "605b580db4a8e60af44d4531",
    })
      .select("id rating title imgUrl")
      .populate({ path: "userId", select: "id name imgUrl" });
    const writeTrans = await Freelancer.find({
      categoryId: "605b580db4a8e60af44d4532",
    })
      .select("id rating title imgUrl")
      .populate({ path: "userId", select: "id name imgUrl" });
    const videoAnimate = await Freelancer.find({
      categoryId: "605b580db4a8e60af44d4533",
    })
      .select("id rating title imgUrl")
      .populate({ path: "userId", select: "id name imgUrl" });

    res
      .status(200)
      .json({ programTech, designGraphic, writeTrans, videoAnimate });
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

  bookingPage: async (req, res) => {
    const { serviceId, serviceUserId, detailNote, accountHolder, bankFrom } =
      req.body;
    if (!req.file) {
      return res.status(404).json({ message: "image not found" });
    }

    if (
      serviceId === undefined ||
      serviceUserId === undefined ||
      detailNote === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined
    ) {
      res.status(404).json({ message: "Field is required" });
    } else {
      const service = await Service.findOne({ _id: serviceId });
      const invoice = Math.floor(1000000 + Math.random() * 9000000);
      const tax = service.price * 0.1;

      const newOrder = {
        freelancerId: service.freelancerId,
        serviceUserId,
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

      res.status(201).json({ message: "Success Booking", order });
    }
  },
};
