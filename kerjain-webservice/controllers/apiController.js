const Category = require("../models/category");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Service = require("../models/service");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  register: async (req, res) => {
    try {
      // get request body from page
      const {
        name,
        email,
        password,
        birthdate,
        address,
        phone,
        categoryId,
      } = req.body;
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
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 3600,
      });
      res.status(200).send({ auth: true, token: token });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  me: (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided" });
    }

    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token" });
      }

      User.findById(decoded.id, function (err, user) {
        if (err)
          return res.status(500).send("There was a problem finding the user");
        if (!user) return res.status(404).send("No user found");
        res.status(200).send(user);
      });
    });
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
      // const preference = req.params;
      // const byPreference = await Freelancer.aggregate({});
      res.status(200).json({ mostPicked });
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
};
