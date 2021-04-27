const Category = require("../models/category");
const User = require("../models/user");
const Freelancer = require("../models/freelancer");
const ServiceUser = require("../models/service_user");
const Service = require("../models/service");

module.exports = {
  register_user: async (req, res) => {
    try {
      // get request from page
      const {
        name,
        email,
        password,
        birthdate,
        address,
        phone,
        categoryId,
      } = req.body;
      // create user
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
      console.log(category);
      // create serviceUser
      const createServiceUser = await ServiceUser.create({
        userId: createUser._id,
        categoryId: categoryId,
      });
      // get selected user
      const user = await User.findOne({ _id: createUser._id });
      // insert serviceUserId to user schema
      // user.serviceUserId = createServiceUser._id;
      // await user.save();
      // push serviceUserId to category schema
      category.serviceUserId.push({ _id: createServiceUser._id });
      await category.save();
      res.status(201).json({ message: "Register Success" });
    } catch (error) {
      res.status(400).json({ message: "Register Trouble" });
    }
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
        .populate({path: "userId", select: "name imgUrl"})
        .populate({
          path: "serviceId._id",
          select: ["title", "description", "price", "imgUrl"],
        })
        .exec();
      res.status(200).json({ freelancer });
    } catch (error) {}
  },
};
